import React from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';import {pageNumbers, bookList as listBooks} from '../Utility';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuIcon from '@mui/icons-material/Menu';
import Select from '@mui/material/Select';

const config = require("../config");

export default function BookList() {
    var [bookList, setBookList] = React.useState([]);
    var [pageCount, setPageCount] = React.useState(0);
    var [orderBy, setOrderBy] = React.useState('year_pub');
    var [reverse, setReverse] = React.useState(false);
    var [anchorEl, setAnchorEl] = React.useState(null);
    var [search, setSearch] = React.useState('');
    var [page, setPage] = React.useState(0);
    
    var menuOpen = Boolean(anchorEl);
    
    function create_url(page) {
        let params = [];
        if (page) params.push('page=' + page);
        params.push('order_by=' + orderBy);
        params.push('reverse=' + reverse);
        if (search) params.push('q=' + search);
        return "/list/?" + params.join('&');
    }

    function updateList() {
        const url = create_url(page);
        window.history.pushState("", "", url)
        Axios.get(config.apiUrl + 'list' + window.location.search).then((data) => {
            setBookList(data.data.books);
            setPageCount(data.data.pageCount);
        })
    }
    
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearch(params.has("q") ? params.get("q") : '');
        setReverse(params.has("reverse") ? Boolean(params.get("reverse")) : false);
        setOrderBy(params.has("order_by") ? params.get("order_by") : "year_pub");
        setPage (params.has("page") ? params.get("page") : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useLayoutEffect(updateList, [orderBy, reverse, search]);

    return (
        <div>
            <h1 className='PageHeading'> Knihy </h1>
            <div className="SearchControls">
                <FormControl fullWidth style={{"maxWidth": "50em"}}>
                    <TextField
                        id="search_text"
                        label="Vyhľadávanie"
                        onKeyPress={(ev)=>{
                            if (ev.key === 'Enter') {
                                updateList();
                            }
                        }}
                        style={{"backgroundColor": "white"}}
                        onChange={(e)=>{setSearch(e.target.value)}}
                        value={search}
                    />
                </FormControl>
                <Button
                    aria-controls={menuOpen ? 'search_options' : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? 'true' : undefined}
                    onClick={(e)=> { setAnchorEl(e.currentTarget) }}
                > <MenuIcon /> </Button>
                <Menu
                    id="search_options"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={()=> { setAnchorEl(null) }}
                    style={{"min-width": "100em"}}
                >
                    <MenuItem>
                        <FormControl fullWidth>
                            <InputLabel id="ordering_label"> Zoradiť podľa </InputLabel>
                            <Select
                                labelId="ordering_label"
                                id="ordering"
                                value={orderBy}
                                label="Zoradiť podľa"
                                onChange={(e)=>{ setOrderBy(e.target.value) }}
                            >
                                <MenuItem value={"year_pub"}> Rok Vydania </MenuItem>
                                <MenuItem value={"isbn"}> ISBN </MenuItem>
                                <MenuItem value={"title"}> Názov </MenuItem>
                                <MenuItem value={"subject_id"}> Predmet </MenuItem>
                                <MenuItem value={"read_time"}> Čas čítania </MenuItem>
                                <MenuItem value={"pages"}> Počet strán </MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <MenuItem>
                        <ToggleButtonGroup exclusive style={{margin: "auto"}} value={reverse} onChange={(e, x)=>{if (x!=null) {setReverse(x)}}}>
                            <ToggleButton value={true}>
                                <ArrowUpward />
                            </ToggleButton>
                            <ToggleButton value={false}>
                                <ArrowDownward />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </MenuItem>
                </Menu>
            </div>
            <div className='PageList'>
                {listBooks(bookList)}
                <p> {bookList.length === 0 ? "Neboli nájdené žiadne knihy" : ""} </p>
                {pageCount > 1 ? <div className='PageNumbers'> { pageNumbers(page, pageCount, create_url) } </div> : []}
            </div>
        </div>
    );
}
