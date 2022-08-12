import getPort, { portNumbers } from "get-port";
import { exec } from "child_process";

const callback = (err, stdout, stdin) => {
  if (err) {
    console.log(err);
    return;
  }
};

const nextOpenPort = await getPort({ port: portNumbers(3000, 3100) });

exec(`open http://localhost:${nextOpenPort}`, callback);
