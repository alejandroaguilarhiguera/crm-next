import { User } from '@/types';
  
export default function UserList({ users }: { users: User[] }) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="p-3 bg-gray-200 rounded-md">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}
  