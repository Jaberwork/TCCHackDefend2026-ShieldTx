export const rapports = [
    { id: 1, numero: "90112233", type: "Phishing SMS", signalements: 47, dernierSignalement: "2026-05-28", zone: "Lomé", score: 92 },
    { id: 2, numero: "99887766", type: "Faux gain", signalements: 31, dernierSignalement: "2026-05-27", zone: "Sokodé", score: 78 },
    { id: 3, numero: "92345678", type: "Usurpation d'identité", signalements: 24, dernierSignalement: "2026-05-25", zone: "Kara", score: 65 },
    { id: 4, numero: "91234567", type: "SIM Swap", signalements: 18, dernierSignalement: "2026-05-20", zone: "Lomé", score: 55 },
    { id: 5, numero: "93456789", type: "Phishing SMS", signalements: 8, dernierSignalement: "2026-05-10", zone: "Atakpamé", score: 28 },
  ];
  
  export const statsData = [
    { mois: "Jan", signalements: 12 },
    { mois: "Fév", signalements: 19 },
    { mois: "Mar", signalements: 31 },
    { mois: "Avr", signalements: 27 },
    { mois: "Mai", signalements: 47 },
  ];
  
  export const typesArnaques = [
    { type: "Phishing SMS", count: 42 },
    { type: "Faux gain", count: 28 },
    { type: "Usurpation", count: 18 },
    { type: "SIM Swap", count: 12 },
  ];
  
  export const getScore = (numero) => {
    const rapport = rapports.find((r) => r.numero === numero);
    if (!rapport) return null;
    return rapport;
  };