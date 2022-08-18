## Running Brightspot
Change directories (cd) to the example directory of your choice. Then cd into `brightspot` and run
```bash
./brightspot-server-install.sh
```

Next,  cd into `brightspot-server` -> `<example directory name>`. To initialize the docker instance, run `docker/up`. To start and stop the docker instance thereafter run `docker/start` or `docker/stop`. To completely remove the docker instance run `docker/down`. You can also restart the container with `docker/restart`.

Once the docker instance is running, navigate to `http://localhost/cms` in your browser. Login with the username and password of your choosing. 


## Installing JS Classes
In a separate terminal window, start at the root of the repository, cd into `<example directory name>` -> `brightspot`.  then run `yarn`. Next, run `npx brightspot login` to login. After logging in, run `npx brightspot types download`. Finally, run `npx brightspot types upload src`. Navigate to the cms (http://localhost/cms) and verify that the content successfully uploaded. You can verify which content to expect by checking the `src/brightspot/example` directory.  


Once complete, return to the README for the example to continue.