const Unauthorized = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-red-500">403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;