import React, { useState } from 'react';
import styled from 'styled-components';
import logo from "../../../photo/logo withedraw.svg";
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Cairo', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #808892;
  text-align: center;


  @media (max-width: 768px) {
    text-align: center;
    font-weight: bold;
  }
`;


const Logo = styled.img`
  width: 60px;
  display: block;
  margin-left: 500px;
  margin-bottom: -5px

  @media (max-width: 768px) {
    width: 50px;
  }

  @media (max-width: 480px) {
    width: 40px;
    margin-left: 133px;
    margin-top: 6px;
    margin-bottom: 4px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: 8px;
  color: #DFBC8A;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  max-width: 560px;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`;

const FileUploadContainer = styled.div`
  position: relative;
  border: 1px dashed #d4a259;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const FileLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const PreviewImage = styled.img`
  max-width: 100px;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SendButton = styled.button`
  background-color: #DFBC8A;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 48%;
  font-size: 0.9rem;

  &:hover {
    background-color: #b38a4d;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 48%;
  font-size: 0.9rem;

  &:hover {
    background-color: #999;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
const Input = styled.input`
  width: 100%;
  max-width: 560px; /* ضبط الحد الأقصى للعرض */
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #d4a259;
  border-radius: 5px;
  background-color: #f9f9f9;
  outline: none;
  font-size: 0.9rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 8px;
    font-size: 12px;
  }
`;


const CreateTicket = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { ticketCategories, lang: locale } = usePage().props;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(route("client.dashboard.create-ticket.post"), {
        title: title,
        ticket_category_id: category,
        description: description,
        image: selectedFile,
    });
    if (response.data.success) {
        toast.success(response.data.message);
        Inertia.visit(route("client.dashboard.tickets"));
    } else {
        toast.error(response.data.message);
    }
};

  return (
    <DashboardLayout>
        <Title>Create Ticket</Title>
      <Container>
      
        <Logo src={logo} alt="Logo" />

      <Form>
        <Label>Ticket Title</Label>
        <Input type="text" placeholder="Ticket Title" style={{width:"580px"}} value={title} onChange={(e) => setTitle(e.target.value)} />

        <Label>Category</Label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Select Category</option>
          {ticketCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name[locale]}
            </option>
          ))}
        </Select>

        <Label>Uploading the file</Label>
        <FileUploadContainer>
          <FileInput type="file" id="file" onChange={handleFileChange} />
          <FileLabel htmlFor="file">Attach The File</FileLabel>
        </FileUploadContainer>

        {selectedFile && (
          <PreviewContainer>
            <PreviewImage src={selectedFile} alt="Preview" />
            <RemoveButton onClick={handleRemoveFile}>Remove</RemoveButton>
          </PreviewContainer>
        )}

        <Label>Description</Label>
        <Textarea placeholder="Description of the problem or request" value={description} onChange={(e) => setDescription(e.target.value)} />

        <ButtonsContainer>
          <SendButton onClick={handleSubmit}>Send</SendButton>
          <CancelButton type="button">Cancel</CancelButton>
        </ButtonsContainer>
        </Form>
      </Container>
    </DashboardLayout>
  );
};

export default CreateTicket;
