import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const COURSES = [
  {
    title: "Développement Web Moderne avec Next.js",
    description: "Maîtrisez la création d'applications web performantes avec React, Next.js et les meilleures pratiques du marché.",
    longDescription: "Cette formation phare vous accompagne de zéro jusqu'au déploiement d'applications web professionnelles. Vous apprendrez les fondamentaux du HTML, CSS et JavaScript, puis vous plongerez dans React et Next.js pour construire des interfaces modernes, rapides et optimisées pour le référencement. Un projet fil rouge vous permettra de mettre en pratique chaque notion.",
    category: "Développement Web",
    level: "Intermédiaire",
    duration: "40 heures",
    price: 75000,
    modules: 12,
    image: "/course-web.png",
    published: true,
    students: 342,
    rating: 4.8,
    instructor: "Ing. Jean-Marc Ndong",
    objectives: ["Comprendre l'architecture d'une application web moderne", "Créer des interfaces réactives avec React et Next.js", "Gérer les données et les formulaires côté serveur", "Déployer une application en production"],
    skills: ["HTML5 & CSS3", "JavaScript ES6+", "React", "Next.js", "Tailwind CSS", "Déploiement Vercel"],
    demoVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    title: "Développement d'Applications Mobiles",
    description: "Concevez des applications mobiles multiplateformes performantes pour Android et iOS.",
    longDescription: "Apprenez à concevoir, développer et publier des applications mobiles multiplateformes. Cette formation couvre l'ergonomie mobile, la gestion de l'état, la connexion aux API et la publication sur les stores.",
    category: "Développement Mobile",
    level: "Intermédiaire",
    duration: "36 heures",
    price: 70000,
    modules: 10,
    image: "/course-mobile.png",
    published: true,
    students: 198,
    rating: 4.6,
    instructor: "Ing. Sylvia Engone",
    objectives: ["Concevoir des interfaces mobiles ergonomiques", "Développer pour Android et iOS avec une seule base de code", "Consommer des API REST", "Publier sur les stores"],
    skills: ["React Native", "UI Mobile", "API REST", "Publication Stores"],
  },
  {
    title: "Marketing Digital & Stratégie de Contenu",
    description: "Développez une stratégie digitale efficace : SEO, réseaux sociaux et publicité en ligne.",
    longDescription: "Maîtrisez les leviers du marketing digital pour développer la visibilité d'une marque. SEO, réseaux sociaux, emailing, publicité payante et analyse de performance sont au programme.",
    category: "Marketing Digital",
    level: "Débutant",
    duration: "28 heures",
    price: 55000,
    modules: 9,
    image: "/course-marketing.png",
    published: true,
    students: 421,
    rating: 4.7,
    instructor: "Mme Marie-Claire Biyoghe",
    objectives: ["Construire une stratégie de contenu", "Optimiser le référencement naturel (SEO)", "Gérer des campagnes publicitaires", "Analyser les performances marketing"],
    skills: ["SEO", "Réseaux sociaux", "Google Ads", "Analytics"],
  },
  {
    title: "Sécurité Informatique & Cybersécurité",
    description: "Protégez les systèmes d'information contre les menaces et les cyberattaques.",
    longDescription: "Cette formation vous initie aux fondamentaux de la cybersécurité : cryptographie, sécurité réseau, gestion des vulnérabilités et bonnes pratiques de protection des données.",
    category: "Sécurité Informatique",
    level: "Avancé",
    duration: "44 heures",
    price: 90000,
    modules: 14,
    image: "/course-security.png",
    published: true,
    students: 156,
    rating: 4.9,
    instructor: "Ing. Brice Owono",
    objectives: ["Identifier les menaces et vulnérabilités", "Sécuriser un réseau d'entreprise", "Mettre en place une politique de sécurité", "Répondre à un incident de sécurité"],
    skills: ["Cryptographie", "Sécurité réseau", "Analyse de vulnérabilités", "Pentest"],
  },
  {
    title: "Utilisation de l'Intelligence Artificielle",
    description: "Exploitez la puissance de l'IA générative pour booster votre productivité.",
    longDescription: "Découvrez comment intégrer l'intelligence artificielle dans votre quotidien professionnel. Prompts efficaces, outils d'IA générative et automatisation des tâches sont au cœur de cette formation.",
    category: "Intelligence Artificielle",
    level: "Débutant",
    duration: "24 heures",
    price: 60000,
    modules: 8,
    image: "/course-ai.png",
    published: true,
    students: 389,
    rating: 4.8,
    instructor: "Dr. Yves Nguema",
    objectives: ["Comprendre les bases de l'IA générative", "Rédiger des prompts efficaces", "Automatiser des tâches courantes", "Utiliser les outils d'IA au travail"],
    skills: ["IA générative", "Prompt engineering", "Automatisation", "Outils IA"],
  },
  {
    title: "Montage Vidéo Professionnel",
    description: "Créez des vidéos captivantes avec les techniques de montage professionnel.",
    longDescription: "Apprenez le montage vidéo de A à Z : découpage, transitions, étalonnage, habillage sonore et export optimisé pour les réseaux et le cinéma.",
    category: "Montage Vidéo",
    level: "Intermédiaire",
    duration: "30 heures",
    price: 65000,
    modules: 10,
    image: "/course-video.png",
    published: true,
    students: 174,
    rating: 4.5,
    instructor: "M. Patrick Moussavou",
    objectives: ["Maîtriser un logiciel de montage professionnel", "Réaliser un montage rythmé et fluide", "Étalonner et corriger les couleurs", "Exporter pour différents supports"],
    skills: ["Montage", "Étalonnage", "Habillage sonore", "Export"],
  },
  {
    title: "Administration Système Linux",
    description: "Devenez autonome dans l'administration de serveurs Linux en entreprise.",
    longDescription: "Formation complète à l'administration de systèmes Linux : ligne de commande, gestion des utilisateurs, services, scripts shell et supervision de serveurs.",
    category: "Administration Linux",
    level: "Avancé",
    duration: "38 heures",
    price: 80000,
    modules: 12,
    image: "/course-linux.png",
    published: true,
    students: 132,
    rating: 4.7,
    instructor: "Ing. Alain Essono",
    objectives: ["Maîtriser la ligne de commande Linux", "Administrer les utilisateurs et permissions", "Configurer des services serveur", "Automatiser avec des scripts shell"],
    skills: ["Bash", "Gestion serveur", "Scripts shell", "Supervision"],
  },
  {
    title: "Cloud Computing & Infrastructure",
    description: "Déployez et gérez des infrastructures modernes dans le cloud.",
    longDescription: "Comprenez les concepts du cloud computing et apprenez à déployer, dimensionner et sécuriser des infrastructures cloud pour des applications d'entreprise.",
    category: "Cloud Computing",
    level: "Intermédiaire",
    duration: "34 heures",
    price: 85000,
    modules: 11,
    image: "/course-cloud.png",
    published: true,
    students: 143,
    rating: 4.6,
    instructor: "Ing. Nadège Assoumou",
    objectives: ["Comprendre les modèles de service cloud", "Déployer des ressources cloud", "Gérer la scalabilité et la disponibilité", "Sécuriser une infrastructure cloud"],
    skills: ["Cloud", "Conteneurs", "Scalabilité", "Sécurité cloud"],
  },
  {
    title: "Réseaux Informatiques",
    description: "Comprenez et configurez les réseaux d'entreprise de bout en bout.",
    longDescription: "Des fondamentaux TCP/IP à la configuration d'équipements réseau, cette formation vous rend opérationnel dans la conception et la maintenance de réseaux d'entreprise.",
    category: "Réseaux Informatiques",
    level: "Débutant",
    duration: "32 heures",
    price: 60000,
    modules: 10,
    image: "/course-network.png",
    published: true,
    students: 167,
    rating: 4.5,
    instructor: "Ing. Christian Oyono",
    objectives: ["Comprendre le modèle OSI et TCP/IP", "Configurer routeurs et commutateurs", "Concevoir un réseau local", "Diagnostiquer les pannes réseau"],
    skills: ["TCP/IP", "Routage", "Commutation", "Diagnostic réseau"],
  },
  {
    title: "Bureautique Professionnelle",
    description: "Gagnez en efficacité avec les outils bureautiques essentiels.",
    longDescription: "Maîtrisez les logiciels de bureautique pour être plus productif : traitement de texte, tableurs avancés, présentations percutantes et gestion documentaire.",
    category: "Bureautique Professionnelle",
    level: "Débutant",
    duration: "20 heures",
    price: 40000,
    modules: 7,
    image: "/course-office.png",
    published: false,
    students: 512,
    rating: 4.4,
    instructor: "Mme Grace Obiang",
    objectives: ["Maîtriser le traitement de texte", "Créer des tableurs avancés", "Concevoir des présentations professionnelles", "Organiser sa gestion documentaire"],
    skills: ["Traitement de texte", "Tableurs", "Présentations", "Productivité"],
  },
]

async function main() {
  console.log("Seeding database...")

  await prisma.enrollment.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Netzone",
      email: "admin@netzone.ga",
      role: "admin",
    },
  })

  const student = await prisma.user.create({
    data: {
      firstName: "Grace",
      lastName: "Obiang",
      email: "etudiant@netzone.ga",
      role: "student",
    },
  })

  const courses = await Promise.all(
    COURSES.map((c) => prisma.course.create({ data: c }))
  )

  await prisma.enrollment.create({
    data: { userId: student.id, courseId: courses[4].id, progress: 65 },
  })
  await prisma.enrollment.create({
    data: { userId: student.id, courseId: courses[0].id, progress: 25 },
  })

  console.log(`Seeded: ${courses.length} courses, 2 users, 2 enrollments`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
