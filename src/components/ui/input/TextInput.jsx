export default function TextInput({ title, ...attributes }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-300">{title}</label>
      <input
        type="text"
        className="mt-1 h-10 bg-gray-900  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-500  rounded-md"
        {...attributes}
      />
    </>
  );
}
