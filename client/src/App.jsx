import { useState } from 'react';
import './App.css'
import { useQuery, useMutation, gql } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});

  const { data: getUsersData, error: getUsersError, loading: getUsersLoading } = useQuery(GET_USERS);
  const { data: getUserByIdData, error: getUserByIdError, loading: getUserByIdLoading} = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p>Data Loading...</p>;
  if (getUserByIdLoading) return <p>Data Loading...</p>;

  if (getUsersError) return <p>Error: {getUsersError.message}</p>;
  if (getUserByIdError) return <p>Error: {getUserByIdError.message}</p>;

  const handleCreateUser = async () => {  
    createUser({ 
      variables: { 
        ...newUser, 
        age: Number(newUser.age), 
        isMarried: false 
      } 
    });
  }

  return (
    <>
      <div>
        <input 
          type="text" 
          id="name" 
          placeholder="Name" 
          onChange={(e) => setNewUser((prev) => ({...prev, name: e.target.value }))} 
        />
        <input 
          type="number" 
          id="age" 
          placeholder="Age" 
          onChange={(e) => setNewUser((prev) => ({...prev, age: e.target.value }))} 
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <h1>Users</h1>

      <div>
        <h1>Chosen User</h1>
        <div>
          <p>Name: {getUserByIdData.getUserById.name}</p>
          <p>Age: {getUserByIdData.getUserById.age}</p>
          <p>Married: {getUserByIdData.getUserById.isMarried ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div>
        {getUsersData.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Married: {user.isMarried ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
