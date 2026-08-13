import { PrismaClient } from "../generated/prisma/client.js";

import {
  Role,
  GroupVisibility,
  GroupMemberStatus,
  MembershipStatus,
  ResourceType,
  ResourceCategory,
  ActivityCategory,
  ReportCategory,
  ReportStatus,
} from "../generated/prisma/enums.js";
import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";
async function main() {
  console.log("🌱 Début du seeding de la base de données...");

  // ==========================================
  // 0. NETTOYAGE (Pour réexécution sans erreurs)
  // ==========================================
  console.log("🧹 Nettoyage des anciennes données...");
  await prisma.report.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.groupMembership.deleteMany();
  await prisma.group.deleteMany();
  await prisma.message.deleteMany();
  await prisma.journalActivity.deleteMany();
  await prisma.journalEntry.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  // Mot de passe par défaut haché pour tous les utilisateurs de test
  const defaultPasswordHash = await bcrypt.hash("Password123!", 10);

  // ==========================================
  // 1. CRÉATION DES UTILISATEURS (Min. 10)
  // ==========================================
  console.log("👤 Création des utilisateurs...");

  // 1. Administrateur
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: defaultPasswordHash,
      role: Role.ADMINISTRATEUR,
      pseudonyme: "AdminRoot",
      nom: "Super",
      prenom: "Admin",
      bio: "Gestionnaire principal de la plateforme.",
    },
  });

  // 2. Utilisateur principal (avec 30 jours de journal)
  const userJournal = await prisma.user.create({
    data: {
      email: "user.journal@example.com",
      passwordHash: defaultPasswordHash,
      role: Role.UTILISATEUR,
      pseudonyme: "AlexTendances",
      nom: "Dupont",
      prenom: "Alex",
      bio: "Suivi quotidien du bien-être.",
    },
  });

  // 8 Autres utilisateurs
  const otherUsersData = [
    {
      email: "marie.curie@example.com",
      pseudonyme: "MarieC",
      prenom: "Marie",
      nom: "Curie",
    },
    {
      email: "lucas.martin@example.com",
      pseudonyme: "LucasM",
      prenom: "Lucas",
      nom: "Martin",
    },
    {
      email: "sophie.bernard@example.com",
      pseudonyme: "SophieB",
      prenom: "Sophie",
      nom: "Bernard",
    },
    {
      email: "thomas.dubois@example.com",
      pseudonyme: "TomD",
      prenom: "Thomas",
      nom: "Dubois",
    },
    {
      email: "emma.petit@example.com",
      pseudonyme: "EmmaP",
      prenom: "Emma",
      nom: "Petit",
    },
    {
      email: "hugo.rousseau@example.com",
      pseudonyme: "HugoR",
      prenom: "Hugo",
      nom: "Rousseau",
    },
    {
      email: "chloe.moreau@example.com",
      pseudonyme: "ChloeM",
      prenom: "Chloé",
      nom: "Moreau",
    },
    {
      email: "nathan.laurent@example.com",
      pseudonyme: "NathL",
      prenom: "Nathan",
      nom: "Laurent",
    },
  ];

  const createdUsers = [];
  for (const u of otherUsersData) {
    const created = await prisma.user.create({
      data: {
        email: u.email,
        passwordHash: defaultPasswordHash,
        role: Role.UTILISATEUR,
        pseudonyme: u.pseudonyme,
        prenom: u.prenom,
        nom: u.nom,
      },
    });
    createdUsers.push(created);
  }

  const allUsers = [admin, userJournal, ...createdUsers];

  // ==========================================
  // 2. ACTIVITÉS DU CATALOGUE
  // ==========================================
  console.log("🏃 Création des activités de catalogue...");
  const activitiesData = [
    {
      name: "Course à pied",
      categorie: ActivityCategory.EXERCICE,
      description: "Cardio en extérieur",
    },
    {
      name: "Méditation",
      categorie: ActivityCategory.BIEN_ETRE,
      description: "Séance de respiration guided",
    },
    {
      name: "Lecture",
      categorie: ActivityCategory.LOISIR,
      description: "30 minutes de roman",
    },
    {
      name: "Balade en forêt",
      categorie: ActivityCategory.SORTIE,
      description: "Marche dans la nature",
    },
    {
      name: "Yoga",
      categorie: ActivityCategory.BIEN_ETRE,
      description: "Étirements légers",
    },
  ];

  const createdActivities = [];
  for (const act of activitiesData) {
    const a = await prisma.activity.create({ data: act });
    createdActivities.push(a);
  }

  // ==========================================
  // 3. 30 JOURS D'ENTRÉES DE JOURNAL (Pour Alex)
  // ==========================================
  console.log("📅 Création de 30 jours d'entrées de journal...");
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const entryDate = new Date(today);
    entryDate.setDate(today.getDate() - i);

    // Variations pour simuler une courbe démontrable
    const scoreBase = (i % 5) + 5; // Note entre 5 et 9

    const entry = await prisma.journalEntry.create({
      data: {
        userId: userJournal.id,
        date: entryDate,
        humeur: scoreBase,
        energie: Math.min(10, scoreBase + 1),
        sommeil: Math.max(1, scoreBase - 1),
        anxiete: Math.max(1, 10 - scoreBase),
        evenements:
          i % 2 === 0
            ? `Journée remplie d'activités (#${30 - i})`
            : "Journée calme au travail.",
        gratitude: "Reconnaissant pour les progrès quotidiens.",
      },
    });

    // Associer 1 à 2 activités par entrée
    const selectedActivity = createdActivities[i % createdActivities.length];
    await prisma.journalActivity.create({
      data: {
        journalEntryId: entry.id,
        activityId: selectedActivity.id,
      },
    });
  }

  // ==========================================
  // 4. RESSOURCES (Une vingtaine)
  // ==========================================
  console.log("📚 Création d'une vingtaine de ressources...");
  const categories = Object.values(ResourceCategory);
  const types = Object.values(ResourceType);

  const createdResources = [];
  for (let i = 1; i <= 20; i++) {
    const res = await prisma.resource.create({
      data: {
        titre: `Guide & Ressource #${i}`,
        description: `Description détaillée de la ressource éducative ou pratique numéro ${i}.`,
        type: types[i % types.length],
        categorie: categories[i % categories.length],
        url: `https://example.com/ressource-${i}`,
        duree: (i % 6) * 5 + 5, // Durée entre 5 et 30 min
      },
    });
    createdResources.push(res);
  }

  // ==========================================
  // 5. GROUPES (Dont au moins un privé)
  // ==========================================
  console.log("👥 Création des groupes...");
  const groupPublic = await prisma.group.create({
    data: {
      nom: "Entraide & Gestion du Stress",
      description:
        "Un espace ouvert à tous pour échanger des conseils sur la gestion de l'anxiété.",
      thematique: "Santé Mentale",
      regles: "Respect et bienveillance obligatoires.",
      groupVisibility: GroupVisibility.PUBLIC,
      moderateurId: admin.id,
    },
  });

  const groupPrivate = await prisma.group.create({
    data: {
      nom: "Cercle Restreint - Sommeil & Récupération",
      description:
        "Groupe privé axé sur le suivi personnalisé des routines nocturnes.",
      thematique: "Sommeil",
      groupVisibility: GroupVisibility.PRIVE,
      moderateurId: createdUsers[0].id,
    },
  });

  // Ajouter des membres aux groupes
  for (const user of allUsers) {
    await prisma.groupMembership.create({
      data: {
        groupId: groupPublic.id,
        userId: user.id,
        groupMemberStatus:
          user.id === admin.id
            ? GroupMemberStatus.MODERATEUR
            : GroupMemberStatus.MEMBRE,
        membershipStatus: MembershipStatus.ACCEPTEE,
      },
    });
  }

  await prisma.groupMembership.create({
    data: {
      groupId: groupPrivate.id,
      userId: createdUsers[0].id,
      groupMemberStatus: GroupMemberStatus.MODERATEUR,
      membershipStatus: MembershipStatus.ACCEPTEE,
    },
  });

  // ==========================================
  // 6. PUBLICATIONS & COMMENTAIRES (Pagination visible)
  // ==========================================
  console.log("📝 Création des publications pour tester la pagination...");

  // Générer 25 posts dans le groupe public pour valider la pagination
  for (let i = 1; i <= 25; i++) {
    const author = allUsers[i % allUsers.length];
    const post = await prisma.post.create({
      data: {
        groupId: groupPublic.id,
        userId: author.id,
        content: `Publication de test #${i} : Partage de réflexion sur la journée. Qu'en pensez-vous ?`,
      },
    });

    // Ajouter quelques commentaires sur les 5 premiers posts
    if (i <= 5) {
      await prisma.comment.create({
        data: {
          postId: post.id,
          userId: allUsers[(i + 1) % allUsers.length].id,
          content: `Merci pour ce partage ! Très intéressant point de vue pour le post #${i}.`,
        },
      });
    }
  }

  // ==========================================
  // 7. FAVORIS ET SIGNALEMENTS (Bonus crédibilité)
  // ==========================================
  console.log("⭐ Ajout de favoris et signalements...");
  await prisma.favorite.create({
    data: {
      userId: userJournal.id,
      resourceId: createdResources[0].id,
    },
  });

  await prisma.report.create({
    data: {
      reporterId: createdUsers[1].id,
      resourceId: createdResources[1].id,
      reportCategory: ReportCategory.SPAM,
      reportStatus: ReportStatus.EN_ATTENTE,
      raison: "Contenu semblant être de la publicité non sollicitée.",
    },
  });

  console.log("✅ Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
