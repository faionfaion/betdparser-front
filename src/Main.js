import React from "react";
import Form from "react-bootstrap/Form";
import {Button, Col, Container, InputGroup, Navbar, Row,} from "react-bootstrap";
import ContentTable from "./ContentTable";



export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            dataTable: [{
                "name": "Loading ...",
                "startTime": 1640995201,
                "comment1": "",
                "comment2": "",
                "comment3": "",
                "goalOrder": "",
                "id": "0",
                "score": "0:0",
                "section_name": "Loading ...",
                "status": 3
            },{
                "name": "Loading ...",
                "startTime": 1640995201,
                "comment1": "",
                "comment2": "",
                "comment3": "",
                "goalOrder": "",
                "id": "1",
                "score": "0:0",
                "section_name": "Loading ...",
                "status": 2
            }]
        }
        this.searchTitle = this.searchTitle.bind(this)
        this.selectDateAction = this.selectDateAction.bind(this)
    };

    componentDidMount() {
        fetch('http://0.0.0.0:8080/api/v1/events')
            .then(response => response.json())
            .then(data => this.setState({dataTable: data }));
    }

    searchTitle() {
        this.setState({dataTable: [{
                "name": "Loading ...",
                "startTime": 1640995201,
                "comment1": "",
                "comment2": "",
                "comment3": "",
                "goalOrder": "",
                "id": "1",
                "score": "0:0",
                "section_name": "Loading ...",
                "status": 2
            }]})

        let search_data = document.getElementById('search_field')
        fetch('http://0.0.0.0:8080/api/v1/events?search=' + search_data.value)
            .then(response => response.json())
            .then(data => this.setState({message: "Результат по запросу: \"" + search_data.value + "\" (" + data.length + ")", dataTable: data }));
    };

    selectDateAction() {
        this.setState({dataTable: [{
                "name": "Loading ...",
                "startTime": 1640995201,
                "comment1": "",
                "comment2": "",
                "comment3": "",
                "goalOrder": "",
                "id": "1",
                "score": "0:0",
                "section_name": "Loading ...",
                "status": 2
            }]})

        let date = document.getElementById('input_date')
        fetch('http://0.0.0.0:8080/api/v1/events?date=' + date.value)
            .then(response => response.json())
            .then(data => this.setState({message: "Результаты за " + date.value, dataTable: data }));
    };

    render() {
        let endPeriod = new Date();
        let startPeriod = new Date();
        startPeriod.setDate(startPeriod.getDate() - 365);
        return (<>
                <Navbar className='bg-light'>
                    <Container className='mt-3 d-flex'>
                        <Col sm={3}>
                            <InputGroup>
                                <Form.Control className="col-3" type="date" name='input_date' id='input_date'
                                              min={startPeriod.toISOString().split('T')[0]}
                                              max={endPeriod.toISOString().split('T')[0]} onInput={this.selectDateAction}/>
                            </InputGroup>
                        </Col>
                        <Col sm={8}>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Введите название события"
                                    aria-label="Введите название события"
                                    aria-describedby="basic-addon2"
                                    id = 'search_field'
                                />
                                <Button variant="outline-secondary" id="button-search" onClick={this.searchTitle}>
                                    Найти
                                </Button>
                            </InputGroup>
                        </Col>
                    </Container>
                </Navbar>
                <Container className='mt-5'>
                    <h3>{this.state.message}</h3>
                    <ContentTable dataTable={this.state.dataTable}/>
                    <Row><a href='http://localhost:8080/api/v1/runparser'><Button variant='danger'>Парсить данные за последний год</Button></a></Row>
                </Container>

            </>
        );
    }
}
