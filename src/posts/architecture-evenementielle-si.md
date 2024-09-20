---
title: "L’architecture événementielle pour des SI flexibles et réactifs"
teaser: "Les entreprises et leurs SI doivent s’adapter rapidement à des évolutions nécessitant instantanéité, haute disponibilité, scalabilité et ouverture. L’architecture « Event-Driven » est une solution clé pour intégrer ces concepts dans les stratégies techniques et organisationnelles."
date: 2024-09-09
tags: architecture, event-driven, scalabilité, SI
authors: Nouamane Cherkaoui
pillar: tech
type: tech
language: fr
articleID: "1000019"
licence: MIT
---

### **L’architecture pilotée par les événements (EDA)**

**L’architecture événementielle (EDA)** est un paradigme de conception où un composant logiciel s'exécute en réponse à la réception d'événements. Depuis l’évolution des architectures monolithiques aux microservices, l'architecture dite **Event Driven** favorise la production, la détection, la consommation et la réaction aux événements.

L'EDA n'est pas une découverte récente. Les interfaces graphiques et les plates-formes financières ont toujours été construites de cette manière pour répondre aux besoins en **temps réel**. Dans un monde digital, nécessitant **agilité**, instantanéité, et scalabilité, l’EDA permet de développer un système composé d'émetteurs, de consommateurs et de canaux d'événements.

### **Une architecture vraiment temps réel, agile et réactive**

Contrairement aux architectures traditionnelles, qui traitaient des données sous forme de lots, l’EDA permet aux applications d'agir sur les événements **au fur et à mesure** qu'ils se produisent. Cela facilite l'ajout de nouvelles applications qui peuvent accéder au flux d'événements **sans affecter les autres systèmes**.

Les émetteurs et consommateurs communiquent de manière **asynchrone**, permettant une indépendance totale et une évolution flexible des services. C'est la suite logique de l'architecture en microservices.

### **Les concepts clés de l’EDA**

Les concepts courants incluent les **éditeurs**, **abonnés**, **sources** et **récepteurs**. L'éditeur capture les données d'événement, l'abonné les consomme et répond potentiellement à ces événements. Ce découplage entre **producteur** et **consommateur** permet une architecture **flexible** et **scalable**, particulièrement adaptée aux événements imprévisibles ou non linéaires comme ceux de l’**IoT**.

### **Mettre en place une architecture événementielle**

La mise en place d'une plate-forme événementielle ne se limite pas aux aspects techniques. Il s'agit avant tout d'une **réflexion stratégique** sur le modèle business et les **use-cases** éligibles. Voici les actions à envisager :

#### **Action 1 : Acculturation architecturale et développement**

Dans des secteurs comme la **supply chain** ou la finance, la culture de la gestion événementielle est bien ancrée. Suivre les changements de prix de matières premières via des signaux d’achat/vente en est un exemple. Cependant, il est crucial de former les **architectes** et **développeurs** à l'EDA pour qu'ils en saisissent tous les avantages en termes d’agilité et de réactivité.

#### **Action 2 : Identifiez vos uses-cases nécessitant du temps réel**

Vos **roadmaps** regorgent de projets business ou réglementaires. Certains cas, comme la gestion des paiements, des alertes fraude, ou la réaffectation des livraisons, sont des **candidats idéaux** pour l'EDA, avec des **gains substantiels** à la clé.

#### **Action 3 : Mise en place d’une plateforme d'événements mutualisée**

Penser à une architecture qui gère l'événementiel via publication/abonnement, intégrant une **plateforme data** pour orchestrer les événements. Comme tout **asset**, la plateforme de streaming d'événements doit être **gouvernée**, avec des événements décrits et catalogués pour être réutilisés par de nouveaux producteurs et consommateurs.

Au fur et à mesure que le catalogue d'événements se remplit, de **nouvelles opportunités** apparaîtront pour un traitement et des informations en **temps réel**.
