import UserList from "@/components/UserList";
import { User } from '@/types';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_HOST}/users`);
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
