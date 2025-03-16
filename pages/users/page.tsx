import UserList from "./UserList";

const getUsers = async () => {
  const res = await fetch("http://127.0.0.1/api/users");
  return res.json();
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <UserList users={users} />
    </div>
  );
}
