import React from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "./App.css";

const config = require("./config");

export default function AddBook() {
    const [title, setTitle] = React.useState("");
    const [authors, setAuthors] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [keywords, setKeywords] = React.useState("");
    const [readTime, setReadTime] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const [yearPub, setYearPub] = React.useState(0);
    const [lang, setLang] = React.useState("");
    const [isbn, setIsbn] = React.useState(0);
    // const [image, setImage] = React.useState("");

    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [authorOptions, setAuthorOptions] = React.useState([]);

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'subject/list').then((data) => {
            console.log(data);
            setSubjectOptions(data.data);
        });
        Axios.get(config.apiUrl + 'author/short').then((data) => {
            console.log(data);
            setAuthorOptions(data.data);
        });
    }, []);

    function handleSubmit(e) {
        Axios.post(config.apiUrl + "book/new/", {
            title: title,
            authors: authors,
            desc: description,
            subject: subject,
            keywords: keywords,
            read_time: readTime,
            pages: pageCount,
            year_pub: yearPub,
            lang: lang,
            isbn: isbn,
            // image: image
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <div className="AddBookForm">
            <FormControl fullWidth>
                <h1> {title ? title : "Nová kniha"} </h1>
                {/* <h2> {authors ? authors : "Nezámy autor"} </h2> */}
                <TextField label="Názov knihy" onChange={(e) => { setTitle(e.target.value); }} />
                <Autocomplete label="Autor" options={authorOptions.map((value) => value.author_name)} renderInput={
                    (params)=> <TextField {...params} label='Autor' />} />
                <TextField label="Popis" multiline fullWidth onChange={(e) => { setDescription(e.target.value); }} />
                <Select label="Predmet" onChange={(e)=>{setSubject(e.target.value)}}>
                    {subjectOptions.map((value) => <MenuItem value={value.subject_id}>{value.subject_name}</MenuItem>)}
                </Select>
                <TextField label="Kľúčové slová" onChange={(e) => { setKeywords(e.target.value); }} />
                <TextField label="Čas čítania" onChange={(e) => { setReadTime(e.target.value); }} />
                <TextField label="Počet strán" onChange={(e) => { setPageCount(parseInt(e.target.value)); }} />
                <TextField label="Rok vydania" onChange={(e) => { setYearPub(parseInt(e.target.value)); }} />
                <TextField label="Jazyk" onChange={(e) => { setLang(e.target.value); }} />
                <TextField label="ISBN" onChange={(e) => { setIsbn(parseInt(e.target.value)); }} />
                <TextField label="Obrázok" onChange={(e) => { setIsbn(e.target.value); }} />
                <Button onClick={handleSubmit}> Pridať </Button>
            </FormControl>
        </div>
    );
}
