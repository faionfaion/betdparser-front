import React from "react";
import { Table } from "react-bootstrap";
import Moment from 'moment'

export default class Main extends React.Component {
    render () {return (
        <Table striped bordered hover key={'MainTable'}>
            <thead>
            <tr>
                <th>Название</th>
                <th>Дата</th>
                <th>Счет</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {this.props.dataTable.map(
                (row) => (
                <tr key={row.id + row.startTime}>
                    <th>{row.name}</th>
                    <th>{Moment(row.startTime * 1000).format('DD-MM-YYYY')}</th>
                    <th>{row.score}</th>
                    <th>{row.status === 3 ? "Завершен" : "Live"}</th>
                </tr>
                ))
            }
            </tbody>

        </Table>
    )}
}