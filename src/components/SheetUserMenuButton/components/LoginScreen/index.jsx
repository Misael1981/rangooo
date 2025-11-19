import UserDataForm from "../UserDataForm";

const LoginScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="mb-2 text-xl leading-none">
          Olá, <strong>faça seu login</strong>
        </h2>
        <p className="text-sm text-gray-500">
          Preencha o formulário, com seus dados corretamente, eles vão garantir
          que seu pedido chegue direitinho até você.
        </p>
        <p className="text-sm text-gray-500">
          Depois, é só se conectar com a sua rede preferida e aproveitar a
          experiência.
        </p>
      </div>
      <UserDataForm />
    </div>
  );
};

export default LoginScreen;
