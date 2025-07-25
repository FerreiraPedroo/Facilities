import * as React from 'react';
import { useNavigate } from "react-router-dom";


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { API } from "../../services/Api.jsx";

const columns = [
  { id: 'requisicao', label: 'REQUISIÇÃO', minWidth: 64 },
  { id: 'descricao', label: 'DESCRIÇÃO', minWidth: 450 },
  {
    id: 'projeto',
    label: 'PROJETO',
    minWidth: 300,
  }
];

function createData(requisicao, descricao, projeto) {
  return { requisicao, descricao, projeto };
}

const rows = API.listaRequisicoes().map(r => createData(r));

export  function Requisicoes() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
console.log(API.listaRequisicoes());

  return (
   <Container>
    <Paper sx={{ width: '100%', overflow: 'hidden', margin: '80px 16px' }} >
      <TableContainer sx={{ width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell className="text-bg-dark"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="button" tabIndex={-1} key={row.requisicao} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}  onClick={()=> navigate(`/requisicoes/${row.requisicao}`)} >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </Container>
  );
}