# Adapter Therefore

_Adapter Therefore_ est un microservice qui permet de transformer le JSON produit par Therefore en un JSON plus lisible pour l'application [Contract Details for Jira Cloud](https://bitbucket.org/dakatec/app-jira-contract-details/).

#### Exemple de JSON en sortie
```json
[
    {
        "No Contrat CSS": "123",
        "Raison Sociale": "Mon client",
        "Structure": "Canon",
        "Réseau": "Réseau",
        "Solution": "Produit",
        "Date Activation": "2014-01-09",
        "Date Renouvellement": "2022-08-31",
        "Date Achat": "2021-01-18",
        "Editeur": "IRIS",
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
        "Valeur contrat": "42",
        "Version": "9"
    }
]
```

## Installation

Création de fichier d'environnement .env :

```
USER=<user>
PASSWORD=<password>
URL_BDD=<webservice therefore>
PORT=<port d'écoute>
```
Création de l'image Docker + lancement :

```shell
docker build -t node-adapter-therefore:latest .
docker run -d -p 42:42 --env-file ./.env adapter-therefore:latest
```

## Licence
Copyright (c) 2022 Daka-Tec