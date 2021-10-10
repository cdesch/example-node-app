# example-node-app


## Docker Build


    docker build -t example-node-app -t cdesch/example-node-app .
    docker push cdesch/example-node-app
    

## Run

    docker run --rm -p 3000:3000 cdesch/example-node-app

## Kubernetes

kubectl config set-context --current --namespace=example-node-app 


Deploy App

    kubectl apply -f deployments/setup
    kubectl apply -n example-node-app -f deployments/deployment.yaml
    kubectl delete -n example-node-app -f deployments/deployment.yaml

    kubectl get pods -n example-node-app 
    kubectl  logs -n example-node-app  node-app-deployment-5d9fbc8946-cs88x


Deploy resources

    kubectl config get-contexts  
    kubectl config use-context docker-desktop
    kubectl apply -f deployments/setup
    kubectl create -n example-node-app -f deployments

    kubectl create -n example-node-app -f deployments/monitoring
    
    kubectl create -f deployments/rule.yaml


Tear Down

    kubectl delete -n example-node-app -f deployments
    kubectl delete -n example-node-app -f deployments/monitoring
    kubectl delete namespaces example-node-app

## RPC App



Deploy resources

    kubectl config get-contexts  
    kubectl config use-context docker-desktop
    kubectl create -f deployments/rpc-app/setup
    kubectl create -n rpc-app -f deployments/rpc-app

    kubectl create -n rpc-app -f deployments/rpc-app
    

Tear Down

    kubectl delete -n example-node-app -f deployments
    kubectl delete -n example-node-app -f deployments/monitoring
    kubectl delete namespaces example-node-app

### Resources

    https://medium.com/@gurpreets0610/deploy-prometheus-grafana-on-kubernetes-cluster-e8395cc16f91

    https://medium.com/kubernetes-tutorials/monitoring-your-kubernetes-deployments-with-prometheus-5665eda54045

    https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/getting-started.md

    https://stackabuse.com/nodejs-application-monitoring-with-prometheus-and-grafana/