'use client';

const mockMessages = [
  {
    id: 'msg1',
    name: 'Brian Nyakundi',
    email: 'nyakundibrian130@gmail.com',
    message: 'Do you ship to Eldoret?',
  },
  {
    id: 'msg2',
    name: 'Eva M.',
    email: 'eva@baywoods.com',
    message: 'I want to restock the hoodie in M size.',
  },
];

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-6">Customer Messages</h1>
      <div className="space-y-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{msg.name}</h2>
              <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline text-sm">
                {msg.email}
              </a>
            </div>
            <p className="text-gray-700 text-sm">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}