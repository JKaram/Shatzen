export function NameInput() {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Name Please
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="name"
          id="name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Michael Scott"
        />
      </div>
    </div>
  );
}
