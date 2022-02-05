import React from 'react'
import Axios from 'axios'
import {bookList} from './Utility'
import DocumentMeta from 'react-document-meta'

const config = require('./config')

export default function AuthorPage() {
    const [authorData, setAuthorData] = React.useState({})

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'author/?author=' + window.location.pathname.match('[^/]*$')).then((data) => {
            console.log(data)
            setAuthorData(data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    const description = authorData.quote ? authorData.quote : "Stránka autora " + authorData.author_name;
	const meta = {
		title: authorData.author_name + " - Gympos knižnica",
		description: description,
		meta: {
			name: {
				keywords: "knižnica, gymnázium, gympos, knihy, " + authorData.author_name,
            },
            property: {
				"og:title": authorData.author_name + " - Gympos knižnica",
                "og:description": description,
				"og:image": "https://bookstore.harmansky.xyz/ogimage.png"
			}
		}
	};

    return (
        <div className='AuthorPageContainer'>
            <DocumentMeta {...meta}/>
            <h1 className='PageHeading'> {"Knihy od autora " + authorData.author_name} </h1>
            {authorData.books ? bookList(authorData.books) : []}
        </div>
    )
}
