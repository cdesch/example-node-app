# example-node-app


## Docker Build


    docker build -t example-node-app -t cdesch/example-node-app .
    docker push cdesch/example-node-app
    

## Run

    docker run --rm -d -p 3000:3000 cdesch/example-node-app

## Kubernetes



Deploy resources

    kubectl config get-contexts  
    kubectl config use-context docker-desktop
    kubectl create -f deployments/setup
    kubectl create -n example-node-app -f deployments

Tear Down

    kubectl delete -n example-node-app -f deployments
    kubectl delete namespaces example-node-app