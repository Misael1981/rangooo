const { Switch } = require("@/components/ui/switch");

const StatusOpenSwitch = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="rounded-full bg-red-500 px-2 text-white">Fechado</span>
      <Switch />
      <span className="rounded-full bg-green-500 px-2 text-white">Aberto</span>
    </div>
  );
};

export default StatusOpenSwitch;
