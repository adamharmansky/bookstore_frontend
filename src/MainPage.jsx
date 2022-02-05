import React from 'react';
import Axios from 'axios';
import './MainPage.css';
import DocumentMeta from 'react-document-meta';

const config = require("./config");

export default function BookList() {

    var [subjectList, setSubjectList] = React.useState([]);

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'subject/list').then((data) => {
            console.log(data);
            setSubjectList(data.data);
        })
    }, []);
	
	let subjects = subjectList.map((subject, i) => { 
        const style = {
            "--subject-clr0": subject.subject_color0,
            "--subject-clr1": subject.subject_color1,
            "--subject-clr2": subject.subject_color2,
            "--subject-bg":   subject.subject_background,
        };

		const classNames = "SubjectBook "+(i===subjectList.length-1?"LastBook":"");

		return <a className={classNames} style={style} href={"/subject/"+subject.subject_id}>{subject.subject_name}</a> 
	});

	const meta = {
		title: "Gympos knižnica",
		description: "Vitajte na stránke knižnice Gymnázia Posťová 9 v Košiciach!",
		meta: {
			name: {
				keywords: "knižnica, gymnázium, gympos, knihy",
				"og:title": "Gympos knižnica - hlavná stránka",
				"og:description": "Vitajte na stránke knižnice Gymnázia Posťová 9 v Košiciach!",
				"og:image": "/ogimage.png"
			}
		}
	};

	return (
		<div className='MainPageContainer'>
			<DocumentMeta {...meta}/>
			<div className='MainPageHeading'>
				<img className='BooksImage' src="/books.png" alt="Chýbajúci obrázok"/>
				<h1><font className='GymposGreen'>GYMPOS</font> Knižnica</h1>
			</div>
			<div className='HeadingShelf'/>
			<div className='MainPageBody'>
				<div className='BookShelfTop'>
					<div className='MainPageSubjects'> {subjects} </div>
					<img className='PlantPot' src="/plantpot.png" alt="ERROR" />
				</div>
				<div className='Shelf'/>
				<div className='BoardsContainer'>
					<div className='Board'></div>
				</div>
			</div>
		</div>
	);
}
