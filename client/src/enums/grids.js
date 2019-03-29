// region Super Expo Grids
export const superConceptionGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet de conception, volet secondaire/collégial",
    type: "CONCEPTION",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Problématique",
                    percentage: 12,
                    criterions: [
                        {
                            id: "1A",
                            description: "Compréhension des principes",
                            percentage: 4
                        },
                        {
                            id: "1B",
                            description: "Définition du problème",
                            percentage: 3
                        },
                        {
                            id: "1C",
                            description: "Recherche d'informations et identification des contraintes",
                            percentage: 3
                        },
                        {
                            id: "1D",
                            description: "Établissement des objectifs",
                            percentage: 2
                        }
                    ]
                },
                {
                    name: "Conception",
                    percentage: 10,
                    criterions: [
                        {
                            id: "2A",
                            description: "Qualité des schémas",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Optimisation des solutions",
                            percentage: 4
                        },
                        {
                            id: "2C",
                            description: "Apparence (fini du prototype, robustesse, qualités artisanales",
                            percentage: 2
                        }
                    ]
                },
                {
                    name: "Analyse du produit",
                    percentage: 25,
                    criterions: [
                        {
                            id: "3A",
                            description: "Cohérence des explications",
                            percentage: 7
                        },
                        {
                            id: "3B",
                            description: "Démonstration du rendement et fonctionnalité",
                            percentage: 7
                        },
                        {
                            id: "3C",
                            description: "Aspect innovateur",
                            percentage: 6
                        },
                        {
                            id: "3D",
                            description: "Pertinence des critères d'évaluation",
                            percentage: 5
                        }
                    ]
                },
                {
                    name: "Bilan",
                    percentage: 13,
                    criterions: [
                        {
                            id: "4A",
                            description: "Perspectives d'utilisation et d'application possibles",
                            percentage: 4
                        },
                        {
                            id: "4B",
                            description: "Recommandations, améliorations et suites ",
                            percentage: 4
                        },
                        {
                            id: "4C",
                            description: "Justification de l'ampleur de la solution par rapport aux objectifs initiaux",
                            percentage: 5
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 28,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "5A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "5B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "5C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Élaboration d'une présentation attrayante et originale",
                            percentage: 7
                        },
                        {
                            id: "6B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 2
                        }
                    ]
                }
            ]
        }
    ]
};

export const superExperimentationGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet en expérimentation, volet secondaire/collégial",
    type: "EXPERIMENTATION",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Identification de la problématique",
                    percentage: 10,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et originalité de la problématique",
                            notes: "Interrogation pertinente sur un phénomène donné.",
                            percentage: 7
                        },
                        {
                            id: "1B",
                            description: "Buts clairement établis",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Élaboration et suivi du protocole expérimental",
                    percentage: 22,
                    criterions: [
                        {
                            id: "2A",
                            description: "Établissement d'une hypothèse de travail et identification des variables à étudier",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Description du protocole expérimental",
                            percentage: 4
                        },
                        {
                            id: "2C",
                            description: "Choix et utilisation adéquate des instruments scientifiques",
                            percentage: 2
                        },
                        {
                            id: "2D",
                            description: "Expérimentation",
                            notes: "Expériences en laboratoires ou manipulations.\nConsignation des observations données.",
                            percentage: 12
                        }
                    ]
                },
                {
                    name: "Analyse et interprétation des résultats",
                    percentage: 20,
                    criterions: [
                        {
                            id: "3A",
                            description: "Utilisation adéquate des données recueillies et de la terminologie",
                            percentage: 7
                        },
                        {
                            id: "3B",
                            description: "Justesse du raisonnement",
                            notes: "Établissement d'un lien structuré entre les résultats",
                            percentage: 6
                        },
                        {
                            id: "3C",
                            description: "Cohérence des explications",
                            percentage: 4
                        },
                        {
                            id: "3D",
                            description: "Reconnaissance des erreurs et réajustement",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Conclusion",
                    percentage: 8,
                    criterions: [
                        {
                            id: "4A",
                            description: "Synthèse",
                            notes: "Reprise des principaux points de l'analyse",
                            percentage: 5
                        },
                        {
                            id: "4B",
                            description: "Recommandations, suggestions de suites possibles, mise en perspective et présentation des applications",
                            percentage: 3
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 28,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "5A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "5B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "5C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 6
                        },
                        {
                            id: "6B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 3
                        }
                    ]
                }
            ]
        }
    ]
};

export const superVulgarisationGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet en vulgarisation, volet secondaire/collégial",
    type: "Vulgarisation",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Choix du sujet",
                    percentage: 8,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et originalité de la problématique",
                            percentage: 4
                        },
                        {
                            id: "1B",
                            description: "Objectifs de la recherche clairement définis",
                            percentage: 4
                        }
                    ]
                },
                {
                    name: "Sélection de l'information",
                    percentage: 14,
                    criterions: [
                        {
                            id: "2A",
                            description: "Variété ",
                            notes: "Information complète et sources diversifiées et récentes",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Fiabilité et pertinence",
                            notes:
                                "Information factuelle et appuyée par diverses publications sur le sujet. Information divulguée en relation avec le phénomène étudié",
                            percentage: 10
                        }
                    ]
                },
                {
                    name: "Compréhension du sujet traité",
                    percentage: 17,
                    criterions: [
                        {
                            id: "3A",
                            description: "Compréhension et maîtrise du sujet",
                            notes: "Capacité de transmettre l'information avec clarté.\nCapacité de faire des liens adéquats avec le sujet",
                            percentage: 6
                        },
                        {
                            id: "3B",
                            description: "Réflexion",
                            notes: "Capacité de dégager les conclusions de l'étude",
                            percentage: 5
                        },
                        {
                            id: "3C",
                            description: "Démonstration des acquis",
                            notes:
                                "Capacité de répondre aux questions.\nCapacité de dégager des applications concrètes et de nouvelles avenues.\nCapacité de faire preuve de sens critique.",
                            percentage: 6
                        }
                    ]
                },
                {
                    name: "Traitement de l'information",
                    percentage: 8,
                    criterions: [
                        {
                            id: "4A",
                            description: "Structure et cohérence",
                            notes:
                                "Information recueillie présentée selon une suite logique et de complexité croissance facilitant la compréhension de l'auditoire",
                            percentage: 5
                        },
                        {
                            id: "4B",
                            description: "Utilisation appropriée de la terminologie",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Approche et présentation novatrice",
                    percentage: 13,
                    criterions: [
                        {
                            id: "5A",
                            description: "Traitement créatif et originalité",
                            notes: "Support pédagogique illustrant la théorie, schémas, tableaux, synoptiques et objets",
                            percentage: 13
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 28,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "6B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "7A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 6
                        },
                        {
                            id: "7B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "7C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 3
                        }
                    ]
                }
            ]
        }
    ]
};
// endregion

//region Highschool grids

export const highschoolConceptionGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet de conception, volet secondaire/collégial",
    type: "CONCEPTION",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Problématique",
                    percentage: 12,
                    criterions: [
                        {
                            id: "1A",
                            description: "Compréhension des principes",
                            percentage: 4
                        },
                        {
                            id: "1B",
                            description: "Définition du problème",
                            percentage: 3
                        },
                        {
                            id: "1C",
                            description: "Recherche d'informations et identification des contraintes",
                            percentage: 3
                        },
                        {
                            id: "1D",
                            description: "Établissement des objectifs",
                            percentage: 2
                        }
                    ]
                },
                {
                    name: "Conception",
                    percentage: 10,
                    criterions: [
                        {
                            id: "2A",
                            description: "Qualité des schémas",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Optimisation des solutions",
                            percentage: 4
                        },
                        {
                            id: "2C",
                            description: "Apparence (fini du prototype, robustesse, qualités artisanales",
                            percentage: 2
                        }
                    ]
                },
                {
                    name: "Analyse du produit",
                    percentage: 25,
                    criterions: [
                        {
                            id: "3A",
                            description: "Cohérence des explications",
                            percentage: 7
                        },
                        {
                            id: "3B",
                            description: "Démonstration du rendement et fonctionnalité",
                            percentage: 7
                        },
                        {
                            id: "3C",
                            description: "Aspect innovateur",
                            percentage: 6
                        },
                        {
                            id: "3D",
                            description: "Pertinence des critères d'évaluation",
                            percentage: 5
                        }
                    ]
                },
                {
                    name: "Bilan",
                    percentage: 13,
                    criterions: [
                        {
                            id: "4A",
                            description: "Perspectives d'utilisation et d'application possibles",
                            percentage: 4
                        },
                        {
                            id: "4B",
                            description: "Recommandations, améliorations et suites ",
                            percentage: 4
                        },
                        {
                            id: "4C",
                            description: "Justification de l'ampleur de la solution par rapport aux objectifs initiaux",
                            percentage: 5
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 40,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "5A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "5B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "5C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Élaboration d'une présentation attrayante et originale",
                            percentage: 7
                        },
                        {
                            id: "6B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 2
                        }
                    ]
                },
                {
                    name: "Rapport écrit et bibliographie",
                    percentage: 12,
                    chiefJudgeOnly: "true",
                    criterions: [
                        {
                            id: "7A",
                            description: "Résumé du projet et contenu",
                            notes: "Page titre, introduction, résultats et analyse, conclusion",
                            percentage: 6
                        },
                        {
                            id: "7B",
                            description: "Présentation générale",
                            notes: "Qualité de la langue, lisibilité, aération du texte",
                            percentage: 2
                        },
                        {
                            id: "7C",
                            description: "Présence de bibliographie et intégrité",
                            notes: "Bibliographie conforme aux sources d'information consultées pour l'ensemble du projet",
                            percentage: 4
                        }
                    ]
                }
            ]
        }
    ]
};

export const highExperimentationGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet en expérimentation, volet secondaire/collégial",
    type: "EXPERIMENTATION",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Identification de la problématique",
                    percentage: 10,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et originalité de la problématique",
                            notes: "Interrogation pertinente sur un phénomène donné.",
                            percentage: 7
                        },
                        {
                            id: "1B",
                            description: "Buts clairement établis",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Élaboration et suivi du protocole expérimental",
                    percentage: 22,
                    criterions: [
                        {
                            id: "2A",
                            description: "Établissement d'une hypothèse de travail et identification des variables à étudier",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Description du protocole expérimental",
                            percentage: 4
                        },
                        {
                            id: "2C",
                            description: "Choix et utilisation adéquate des instruments scientifiques",
                            percentage: 2
                        },
                        {
                            id: "2D",
                            description: "Expérimentation",
                            notes: "Expériences en laboratoires ou manipulations.\nConsignation des observations données.",
                            percentage: 12
                        }
                    ]
                },
                {
                    name: "Analyse et interprétation des résultats",
                    percentage: 20,
                    criterions: [
                        {
                            id: "3A",
                            description: "Utilisation adéquate des données recueillies et de la terminologie",
                            percentage: 7
                        },
                        {
                            id: "3B",
                            description: "Justesse du raisonnement",
                            notes: "Établissement d'un lien structuré entre les résultats",
                            percentage: 6
                        },
                        {
                            id: "3C",
                            description: "Cohérence des explications",
                            percentage: 4
                        },
                        {
                            id: "3D",
                            description: "Reconnaissance des erreurs et réajustement",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Conclusion",
                    percentage: 8,
                    criterions: [
                        {
                            id: "4A",
                            description: "Synthèse",
                            notes: "Reprise des principaux points de l'analyse",
                            percentage: 5
                        },
                        {
                            id: "4B",
                            description: "Recommandations, suggestions de suites possibles, mise en perspective et présentation des applications",
                            percentage: 3
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 40,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "5A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "5B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "5C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 6
                        },
                        {
                            id: "6B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Rapport écrit et bibliographie",
                    percentage: 12,
                    chiefJudgeOnly: "true",
                    criterions: [
                        {
                            id: "7A",
                            description: "Résumé du projet et contenu",
                            notes: "Page titre, introduction, résultats et analyse, conclusion",
                            percentage: 6
                        },
                        {
                            id: "7B",
                            description: "Présentation générale",
                            notes: "Qualité de la langue, lisibilité, aération du texte",
                            percentage: 2
                        },
                        {
                            id: "7C",
                            description: "Présence de bibliographie et intégrité",
                            notes: "Bibliographie conforme aux sources d'information consultées pour l'ensemble du projet",
                            percentage: 4
                        }
                    ]
                }
            ]
        }
    ]
};

export const highVulgarisationGrid = {
    level: "highschool",
    name: "Grille d'évaluation pour un projet en vulgarisation, volet secondaire/collégial",
    type: "Vulgarisation",
    sections: [
        {
            name: "Scientifique",
            percentage: 60,
            subsections: [
                {
                    name: "Choix du sujet",
                    percentage: 8,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et compréhension de la problématique",
                            percentage: 4
                        },
                        {
                            id: "1B",
                            description: "Objectifs de la recherche clairement définis",
                            percentage: 4
                        }
                    ]
                },
                {
                    name: "Sélection de l'information",
                    percentage: 14,
                    criterions: [
                        {
                            id: "2A",
                            description: "Variété ",
                            notes: "Information complète et sources diversifiées et récentes",
                            percentage: 4
                        },
                        {
                            id: "2B",
                            description: "Fiabilité et pertinence",
                            notes:
                                "Information factuelle et appuyée par diverses publications sur le sujet. Information divulguée en relation avec le phénomène étudié",
                            percentage: 10
                        }
                    ]
                },
                {
                    name: "Compréhension du sujet traité",
                    percentage: 17,
                    criterions: [
                        {
                            id: "3A",
                            description: "Compréhension et maîtrise du sujet",
                            notes: "Capacité de transmettre l'information avec clarté.\nCapacité de faire des liens adéquats avec le sujet",
                            percentage: 6
                        },
                        {
                            id: "3B",
                            description: "Réflexion",
                            notes: "Capacité de dégager les conclusions de l'étude",
                            percentage: 5
                        },
                        {
                            id: "3C",
                            description: "Démonstration des acquis",
                            notes:
                                "Capacité de répondre aux questions.\nCapacité de dégager des applications concrètes et de nouvelles avenues.\nCapacité de faire preuve de sens critique.",
                            percentage: 6
                        }
                    ]
                },
                {
                    name: "Traitement de l'information",
                    percentage: 8,
                    criterions: [
                        {
                            id: "4A",
                            description: "Structure et cohérence",
                            notes:
                                "Information recueillie présentée selon une suite logique et de complexité croissance facilitant la compréhension de l'auditoire",
                            percentage: 5
                        },
                        {
                            id: "4B",
                            description: "Utilisation appropriée de la terminologie",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Approche et présentation novatrice",
                    percentage: 13,
                    criterions: [
                        {
                            id: "5A",
                            description: "Traitement créatif et originalité",
                            notes: "Support pédagogique illustrant la théorie, schémas, tableaux, synoptiques et objets",
                            percentage: 13
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 40,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 14,
                    criterions: [
                        {
                            id: "6A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 6
                        },
                        {
                            id: "6B",
                            description: "Dynamisme de la présentation et enthousiasme",
                            percentage: 5
                        },
                        {
                            id: "6C",
                            description: "Vulgarisation et utilisation du langage approprié",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 14,
                    criterions: [
                        {
                            id: "7A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 6
                        },
                        {
                            id: "7B",
                            description: "Clarté",
                            notes: "Ordre et lisibilité des éléments de présentation de façon à faciliter le suivi de l'exposé",
                            percentage: 5
                        },
                        {
                            id: "7C",
                            description: "Qualité de la langue écrite et de la terminologie employée",
                            percentage: 3
                        }
                    ]
                },
                {
                    name: "Rapport écrit et bibliographie",
                    percentage: 12,
                    chiefJudgeOnly: "true",
                    criterions: [
                        {
                            id: "8A",
                            description: "Résumé du projet et contenu",
                            notes: "Page titre, introduction, résultats et analyse, conclusion",
                            percentage: 6
                        },
                        {
                            id: "8B",
                            description: "Présentation générale",
                            notes: "Qualité de la langue, lisibilité, aération du texte",
                            percentage: 2
                        },
                        {
                            id: "8C",
                            description: "Présence de bibliographie et intégrité",
                            notes: "Bibliographie conforme aux sources d'information consultées pour l'ensemble du projet",
                            percentage: 4
                        }
                    ]
                }
            ]
        }
    ]
};

// endregion

//region Elementary grids

export const elementaryConceptionGrid = {
    level: "elementary",
    name: "Grille d'évaluation pour un projet de conception, volet primaire",
    type: "CONCEPTION",
    sections: [
        {
            name: "Scientifique",
            percentage: 50,
            subsections: [
                {
                    name: "Problématique",
                    percentage: 10,
                    criterions: [
                        {
                            id: "1A",
                            description: "Problématique",
                            notes: "La problématique est-elle bien définie?\nD'où vient l'intérêt pour la problématique?",
                            percentage: 10
                        }
                    ]
                },
                {
                    name: "Conception",
                    percentage: 10,
                    criterions: [
                        {
                            id: "2A",
                            description: "Conception",
                            notes: "Les croquis et les schémas sont-ils de qualité?",
                            percentage: 10
                        }
                    ]
                },
                {
                    name: "Analyse du produit",
                    percentage: 17,
                    criterions: [
                        {
                            id: "3A",
                            description: "Analyse du produit",
                            notes: "La démonstration de la fonctionnalité est-elle convaincante?",
                            percentage: 17
                        }
                    ]
                },
                {
                    name: "Bilan",
                    percentage: 13,
                    criterions: [
                        {
                            id: "4A",
                            description: "Les perspectives d'utilisation et d'application sont-elles rencontrées?",
                            percentage: 13
                        }
                    ]
                }
            ]
        },
        {
            name: "Apprentissage",
            percentage: 20,
            subsections: [
                {
                    name: "Apprentissage",
                    percentage: 20,
                    criterions: [
                        {
                            id: "5A",
                            description: "Apprentissage",
                            percentage: 20
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 30,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 15,
                    criterions: [
                        {
                            id: "6A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 15
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 15,
                    criterions: [
                        {
                            id: "7A",
                            description: "Élaboration d'une présentation attrayante et originale",
                            percentage: 15
                        }
                    ]
                }
            ]
        }
    ]
};

export const elementaryExperimentationGrid = {
    level: "elementary",
    name: "Grille d'évaluation pour un projet en expérimentation, volet primaire",
    type: "EXPERIMENTATION",
    sections: [
        {
            name: "Scientifique",
            percentage: 50,
            subsections: [
                {
                    name: "Identification de la problématique",
                    percentage: 8,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et originalité de la problématique",
                            notes: "Interrogation pertinente sur un phénomène donné.",
                            percentage: 8
                        }
                    ]
                },
                {
                    name: "Élaboration et suivi du protocole expérimental",
                    percentage: 18,
                    criterions: [
                        {
                            id: "2A",
                            description: "Établissement d'une hypothèse de travail et identification des variables à étudier",
                            percentage: 18
                        }
                    ]
                },
                {
                    name: "Analyse et interprétation des résultats",
                    percentage: 17,
                    criterions: [
                        {
                            id: "3A",
                            description: "Utilisation adéquate des données recueillies et de la terminologie",
                            percentage: 17
                        }
                    ]
                },
                {
                    name: "Conclusion",
                    percentage: 7,
                    criterions: [
                        {
                            id: "4A",
                            description: "Synthèse",
                            notes: "Reprise des principaux points de l'analyse",
                            percentage: 7
                        }
                    ]
                }
            ]
        },
        {
            name: "Apprentissage",
            percentage: 20,
            subsections: [
                {
                    name: "Apprentissage",
                    percentage: 20,
                    criterions: [
                        {
                            id: "5A",
                            description: "Apprentissage",
                            percentage: 20
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 30,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 15,
                    criterions: [
                        {
                            id: "6A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 15
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 15,
                    criterions: [
                        {
                            id: "7A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 15
                        }
                    ]
                }
            ]
        }
    ]
};

export const elementaryVulgarisationGrid = {
    level: "elementary",
    name: "Grille d'évaluation pour un projet en vulgarisation, volet primaire",
    type: "Vulgarisation",
    sections: [
        {
            name: "Scientifique",
            percentage: 50,
            subsections: [
                {
                    name: "Choix du sujet",
                    percentage: 9,
                    criterions: [
                        {
                            id: "1A",
                            description: "Connaissance et originalité de la problématique",
                            percentage: 9
                        }
                    ]
                },
                {
                    name: "Sélection de l'information",
                    percentage: 12,
                    criterions: [
                        {
                            id: "2A",
                            description: "Variété ",
                            notes: "Information complète et sources diversifiées et récentes",
                            percentage: 12
                        }
                    ]
                },
                {
                    name: "Compréhension du sujet traité",
                    percentage: 15,
                    criterions: [
                        {
                            id: "3A",
                            description: "Compréhension et maîtrise du sujet",
                            notes: "Capacité de transmettre l'information avec clarté.\nCapacité de faire des liens adéquats avec le sujet",
                            percentage: 15
                        }
                    ]
                },
                {
                    name: "Traitement de l'information",
                    percentage: 9,
                    criterions: [
                        {
                            id: "4A",
                            description: "Structure et cohérence",
                            notes:
                                "Information recueillie présentée selon une suite logique et de complexité croissance facilitant la compréhension de l'auditoire",
                            percentage: 9
                        }
                    ]
                },
                {
                    name: "Approche et présentation novatrice",
                    percentage: 5,
                    criterions: [
                        {
                            id: "5A",
                            description: "Traitement créatif et originalité",
                            notes: "Support pédagogique illustrant la théorie, schémas, tableaux, synoptiques et objets",
                            percentage: 5
                        }
                    ]
                }
            ]
        },
        {
            name: "Apprentissage",
            percentage: 20,
            subsections: [
                {
                    name: "Apprentissage",
                    percentage: 20,
                    criterions: [
                        {
                            id: "6A",
                            description: "Apprentissage",
                            percentage: 20
                        }
                    ]
                }
            ]
        },
        {
            name: "Communication",
            percentage: 30,
            subsections: [
                {
                    name: "Animation du stand",
                    percentage: 15,
                    criterions: [
                        {
                            id: "7A",
                            description: "Interaction avec l'auditoire et gestion du temps",
                            notes:
                                "Capacité de susciter l'intérêt et la participation de l'auditoire.\n Capacité d'évaluer la compréhension et de répondre adéquatement aux questions.\n Capacité de respecter le temps alloué à la présentation",
                            percentage: 15
                        }
                    ]
                },
                {
                    name: "Présentation visuelle",
                    percentage: 15,
                    criterions: [
                        {
                            id: "8A",
                            description: "Soutien approprié à l'animation et à la compréhension",
                            percentage: 15
                        }
                    ]
                }
            ]
        }
    ]
};

// endregion
