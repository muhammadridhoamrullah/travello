export default function Register() {
  return (
    <form
      action=""
      className="min-h-screen w-full flex items-center justify-center"
    >
      <div className="w-[900px] h-[450px] bg-gradient-to-r from-red-500 to-blue-600 rounded-2xl flex  justify-center overflow-hidden ">
        <div className="flex-2 h-full relative">
          <img
            src={"/register.jpg"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-3 ">Form</div>
      </div>
    </form>
  );
}
