# Adapter Therefore

_Adapter Therefore_ est un microservice qui permet de transformer le JSON produit par Therefore en un JSON plus lisible pour l'application [Contract Details for Jira Cloud](https://bitbucket.org/dakatec/app-jira-contract-details/) et [Contract Status for Jira Cloud](https://bitbucket.org/dakatec/app-jira-contract-status/).

#### Exemple de JSON en sortie
```json
{
    "contracts": [
        {
            "No Contrat CSS": "1234",
            "Raison Sociale": "mon client",
            "Structure": "Canon France Sas",
            "Réseau": "Réseau C&I",
            "Solution": "mon produit",
            "Date Activation": "2014-01-09",
            "Date Renouvellement": "2022-08-31",
            "Date Achat": "2021-01-18",
            "Editeur": "Editeur",
            "No Série Editeur": "123",
            "Statut Contrat": "2 - Activé",
            "Nom Distrib": null,
            "Nb Pts Editeur": "95",
            "Fact Distrib": null,
            "N° Contrat ORACLE/ARTIS": null,
            "Commentaires": null,
            "Type contrat": "CSS-IRI",
            "Date Fin": null,
            "Type client": "Privé",
            "Valeur contrat": "123",
            "Version": "9"
        }
    ]
}
```

## Installation

Création de fichier d'environnement .env :

```
# Properties for Therefore
USER=<user>
PASSWORD=<password>
URL_BDD=<webservice therefore>

# Properties for application
PORT=<port d'écoute>
API_KEY=<api key>
```
Création de l'image Docker + lancement :

```shell
docker build -t node-adapter-therefore:latest .
docker run -d -v $(pwd)/logs:/app/adapter-therefore/logs -p 42:42 --env-file ./.env 147065063210.dkr.ecr.eu-west-3.amazonaws.com/adapter-therefore:1.2
```

## Licence
Copyright (c) 2022 Daka-Tec