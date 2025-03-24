import UserList from "@/components/UserList";
import { User, Meta } from '@/types';

interface PayloadUsers {
  data: User[];
  meta: Meta;
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:1337/api/users");
  const users: User[] = await res.json();
    console.log('users', users);
  return {
    props: { users },
  };
}


export default function UsersPage({ users }: { users: User[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de usuarios</h2>
      <UserList users={users} />
    </div>
  );
}
