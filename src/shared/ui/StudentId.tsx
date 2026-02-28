export const StudentId = ({ id, name }: { id: string; name: string }) => (
    <div className="flex gap-4">
      <span className="text-gray-400">{id}</span>
      {name}
    </div>
  );