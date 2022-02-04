import React from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import './BookPage.css'

const config = require("./config");

export default function AddBook() {
    const [title, setTitle] = React.useState("");
    const [authors, setAuthors] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [content, setContent] = React.useState("");
    const [subject, setSubject] = React.useState({});
    const [keywords, setKeywords] = React.useState("");
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [pageCount, setPageCount] = React.useState('');
    const [yearPub, setYearPub] = React.useState('');
    const [lang, setLang] = React.useState({});
    const [isbn, setIsbn] = React.useState('');
    const [image, setImage] = React.useState({});

    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [authorOptions, setAuthorOptions] = React.useState([]);
    const [langOptions, setLangOptions] = React.useState([]);

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'subject/list').then((data) => {
            console.log(data);
            setSubjectOptions(data.data);
        });
        Axios.get(config.apiUrl + 'author/short').then((data) => {
            console.log(data);
            setAuthorOptions(data.data);
        });
        Axios.get(config.apiUrl + 'lang/short').then((data) => {
            console.log(data);
            setLangOptions(data.data);
        });
    }, []);

    function handleSubmit(e) {
        if (isNaN(hours) || isNaN(minutes) || isNaN(pageCount) || isNaN(yearPub) || !isbn || !title) {
            window.alert("Prosím vložte správne hodnoty");
            return;
        }
        const formData = new FormData();
        formData.append("image", image, image.name);
        Axios.post(config.apiUrl + "image/new", formData);
        Axios.post(config.apiUrl + "book/new/", {
            title: title,
            authors: authors,
            desc: description,
            content: content,
            subject: subject.subject_id,
            keywords: keywords,
            read_time: parseInt(hours)*60 + parseInt(minutes),
            pages: pageCount,
            year_pub: yearPub,
            lang: lang.lang_id,
            isbn: isbn,
            image: '/pub/' + image.name
        }).then((response) => {
            console.log(response);
        });
    }

    const style = {
        "--subject-clr0": subject.subject_color0,
        "--subject-clr1": subject.subject_color1,
        "--subject-clr2": subject.subject_color2,
        "--subject-bg": subject.subject_background
    };

    return (
        <div className="BookPageContainer" style={style}>
            <h1> {title ? title : "Nová kniha"} </h1>
            <h2> {authors ? authors.join(', ') : "Nezámy autor"} </h2>

            <TextField fullWidth label="Názov knihy" onChange={(e) => { setTitle(e.target.value); }} />

            <Autocomplete
                multiple freeSolo fullWidth
                label="Autori"
                options={authorOptions.map((value) => value.author_name)}
                renderInput={ (params)=> <TextField {...params} label='Autori' />}
                onChange={(e,v)=>{console.log(v); setAuthors(v)}}
            />

            <FormControl fullWidth>
                <InputLabel id='subject-select-label'> Predmet </InputLabel>
                <Select label="Predmet" labelId='subject-select-label' id='subject-select' onChange={(e)=>{setSubject(e.target.value)}}>
                    {subjectOptions.map((value) => <MenuItem value={value}>{value.subject_name}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField fullWidth label="Popis" multiline onChange={(e) => { setDescription(e.target.value); }} />
            <TextField fullWidth label="Obsah" multiline onChange={(e) => { setContent(e.target.value); }} />
            <TextField fullWidth label="Kľúčové slová" onChange={(e) => { setKeywords(e.target.value); }} />
            <TextField error={isNaN(hours)} label="Hodiny" onChange={(e) => {setHours(e.target.value)}} />
            <TextField error={isNaN(minutes)} label="Minúty" onChange={(e) => { setMinutes(e.target.value); }} />
            <TextField fullWidth error={isNaN(pageCount)} label="Počet strán" onChange={(e) => { setPageCount(parseInt(e.target.value)); }} />
            <TextField fullWidth error={isNaN(yearPub)} label="Rok vydania" onChange={(e) => { setYearPub(parseInt(e.target.value)); }} />

            <FormControl fullWidth>
                <InputLabel> Jazyk </InputLabel>
                <Select label="Jazyk" onChange={(e)=>{setLang(e.target.value)}}>
                    {langOptions.map((value) => <MenuItem value={value}>{value.lang_name}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField fullWidth label="ISBN" onChange={(e) => { setIsbn(e.target.value); }} />
            <Button component='label'> Nahrať Obrázok <input type='file' hidden onChange={(e)=>{setImage(e.target.files[0])}}/> </Button> <span>{image.name}</span>

            <Button fullWidth onClick={handleSubmit}> Pridať </Button>
        </div>
    );
}
