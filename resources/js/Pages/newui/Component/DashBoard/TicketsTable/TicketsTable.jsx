import { React,useState } from 'react';
import styled from 'styled-components';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { route } from 'ziggy-js';
const TableContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  overflow-x: auto; /* لجعل الجدول قابلاً للتمرير إذا كان العرض ضيقًا */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 5px;
    margin: 5px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  min-width: 600px; /* لضمان عرض جيد على الشاشات الصغيرة */

  @media (max-width: 768px) {
    width:auto;
    height:auto;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #f1f3f5;
  color: #7a7a7a;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 8px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  color: #4a4a4a;
  font-size: 20px;
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 4px;
    word-break: break-word; /* لضمان عدم خروج النص عن الشاشة */
  }
`;

const StatusButton = styled.button`
  width: 118px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
  margin-right: 10px;
  background-color: ${({ status }) => (status === 'open' ? '#6c757d' : '#6c757d')};
  transition: background-color 0.3s ease;
  

  &:hover {
    background-color: ${({ status }) => (status === 'open' ? '#5a6268' : '#5a6268')};
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`;

const ActionButton = styled.button`
  width: 116px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: #6c757d;
  color: #fff;
  transition: background-color 0.3s ease;
  overflow-x: auto;
  overflow-y: hidden;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`;

const TicketsTable = () => {
  const { tickets, lang: locale } = usePage().props;
  return (
    <DashboardLayout>
      <h2
        style={{
          marginBottom: '-2px',
          marginTop: '20px',
          fontSize: '1.4rem',
          marginLeft: '20px',
          fontWeight: 'bold',
          color: '#808892',
          textAlign: 'center',
        }}
      >
        Tickets
      </h2>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Ticket ID</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <TableRow key={ticket.id}>
                <TableData>{ticket.created_human_at}</TableData>
                <TableData>{ticket.ticket_id}</TableData>
                <TableData>{ticket.title}</TableData>
                <TableData>{ticket.ticket_category.name[locale]}</TableData>
                <TableData>
                  <StatusButton status={ticket.status}>{ticket.status}</StatusButton>
                </TableData>
                <TableData>
                  <ActionButton>
                    <Link href={route('client.dashboard.show-ticket', { id: ticket.id })}>View</Link>
                  </ActionButton>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </DashboardLayout>
  );
};

export default TicketsTable;
