// RAYAN FOOTBALL
// قاعدة بيانات المباريات على الجهاز

let matches = JSON.parse(
    localStorage.getItem("rayanMatches")
) || [];

// تحديث الإحصائيات
function updateStats() {
    const total = {
        matches: matches.length,
        goals: 0,
        assists: 0,
        minutes: 0,
        starts: 0,
        yellowCards: 0
    };

    matches.forEach(match => {
        total.goals += match.goals;
        total.assists += match.assists;
        total.minutes += match.minutes;

        if (match.isStarter) {
            total.starts++;
        }

        total.yellowCards += match.yellowCards || 0;
    });

    document.getElementById("matches").textContent = total.matches;
    document.getElementById("goals").textContent = total.goals;
    document.getElementById("assists").textContent = total.assists;
    document.getElementById("minutes").textContent = total.minutes;
    document.getElementById("starts").textContent = total.starts;
    document.getElementById("yellowCards").textContent = total.yellowCards;
}

// عرض المباريات
function displayMatches() {
    const table = document.getElementById("matchTable");

    if (matches.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6">لا توجد مباريات مسجلة حتى الآن</td>
            </tr>
        `;
        updateStats();
        return;
    }

    table.innerHTML = "";

    matches.forEach(match => {
        const row = document.createElement("tr");

        [
            match.date,
            match.opponent,
            match.result,
            match.goals,
            match.assists,
            match.minutes
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    updateStats();
}

// إضافة مباراة
document.getElementById("matchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const match = {
        date: document.getElementById("date").value,
        opponent: document.getElementById("opponent").value.trim(),
        result: document.getElementById("result").value.trim(),
        goals: Number(document.getElementById("matchGoals").value),
        assists: Number(document.getElementById("matchAssists").value),
        minutes: Number(document.getElementById("matchMinutes").value),
        isStarter: document.getElementById("isStarter").checked,
        yellowCards: 0
    };

    matches.push(match);

    localStorage.setItem("rayanMatches", JSON.stringify(matches));

    displayMatches();

    this.reset();

    alert("تم تسجيل المباراة بنجاح");
});

// تشغيل الموقع
displayMatches();
const languageToggle = document.getElementById("languageToggle");

const translations = {
  ar: {
    nav: ["الرئيسية", "الإحصائيات", "المسيرة", "عن اللاعب"],
    eyebrow: ["OFFICIAL PLAYER PROFILE", "PERFORMANCE", "CAREER HISTORY", "ABOUT THE PLAYER", "MATCH HISTORY"],
    heroTitle: "RAYAN",
    heroSubtitle: "FOOTBALL PLAYER",
    heroDescription: "جناح أيسر وصانع ألعاب — لاعب يسعى دائمًا للتطور وصناعة الفارق داخل الملعب.",
    heroButton: "اكتشف إحصائياتي",
    tags: ["LW / CAM", "رقم القميص 99", "AL AMEYD"],
    sectionTitles: ["الإحصائيات الشخصية", "المسيرة الكروية", "عن اللاعب", "سجل المباريات"],
    statNames: ["المباريات", "الأهداف", "التمريرات الحاسمة", "دقائق اللعب", "المباريات الأساسية", "البطاقات الصفراء"],
    note: "تبدأ الإحصائيات من الصفر، وتتحدث عند إضافة بيانات المباريات.",
    clubs: ["نادي أبها", "نادي بيراميدز", "جينس فيمس", "نادي العميد"],
    currentClub: "النادي الحالي",
    about: "ريان لاعب كرة قدم يشغل مركز الجناح الأيسر وصانع الألعاب. يحب المهارة واللعب الجماعي، ويهتم بالمراوغة والتحرك لخلق المساحات وإتاحة الفرص لزملائه، إلى جانب المساهمة في تسجيل الأهداف وصناعتها. يستطيع اللعب بكلتا القدمين، ويسعى باستمرار إلى تطوير مستواه الفني وفهمه للعبة.",
    details: ["النادي", "المركز", "القدم المفضلة", "رقم القميص"],
    table: ["التاريخ", "المنافس", "النتيجة", "الأهداف", "الصناعة", "الدقائق"],
    empty: "لا توجد مباريات مسجلة حتى الآن",
    addMatch: "إضافة مباراة جديدة",
    opponent: "اسم المنافس",
    result: "النتيجة مثال 2-1",
    goals: "الأهداف",
    assists: "الصناعة",
    minutes: "دقائق اللعب",
    starter: "شاركت أساسيًا",
    addButton: "إضافة المباراة",
    footer: "جميع الحقوق محفوظة."
  },

  en: {
    nav: ["Home", "Statistics", "Career", "About"],
    eyebrow: ["OFFICIAL PLAYER PROFILE", "PERFORMANCE", "CAREER HISTORY", "ABOUT THE PLAYER", "MATCH HISTORY"],
    heroTitle: "RAYAN",
    heroSubtitle: "FOOTBALL PLAYER",
    heroDescription: "Left winger and attacking midfielder — always striving to improve and make a difference on the pitch.",
    heroButton: "Explore My Stats",
    tags: ["LW / CAM", "JERSEY NO. 99", "AL AMEYD"],
    sectionTitles: ["Player Statistics", "Football Career", "About the Player", "Match History"],
    statNames: ["Appearances", "Goals", "Assists", "Minutes Played", "Starts", "Yellow Cards"],
    note: "Statistics start at zero and update when match data is added.",
    clubs: ["Abha Club", "Pyramids FC", "Jins Vims", "Al Ameyd Club"],
    currentClub: "CURRENT CLUB",
    about: "Rayan is a football player who plays as a left winger and attacking midfielder. He enjoys skillful play and teamwork, focusing on dribbling and movement to create space and opportunities for teammates, while contributing to goals and assists. He can play with both feet and continuously works to develop his technical ability and understanding of the game.",
    details: ["Club", "Position", "Preferred Foot", "Jersey Number"],
    table: ["Date", "Opponent", "Result", "Goals", "Assists", "Minutes"],
    empty: "No matches recorded yet",
    addMatch: "Add New Match",
    opponent: "Opponent name",
    result: "Result e.g. 2-1",
    goals: "Goals",
    assists: "Assists",
    minutes: "Minutes played",
    starter: "Started the match",
    addButton: "Add Match",
    footer: "All rights reserved."
  }
};

function setLanguage(lang) {
  const t = translations[lang];
  const isEnglish = lang === "en";

  document.documentElement.lang = lang;
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  document.documentElement.dataset.language = lang;

  document.querySelectorAll(".navbar nav a").forEach((el, i) => {
    if (t.nav[i]) el.textContent = t.nav[i];
  });

  document.querySelectorAll(".eyebrow").forEach((el, i) => {
    if (t.eyebrow[i]) el.textContent = t.eyebrow[i];
  });

  document.querySelector(".hero h1").textContent = t.heroTitle;
  document.querySelector(".hero h2").textContent = t.heroSubtitle;
  document.querySelector(".hero-description").textContent = t.heroDescription;
  document.querySelector(".main-button").textContent = t.heroButton;

  document.querySelectorAll(".player-tags span").forEach((el, i) => {
    if (t.tags[i]) el.textContent = t.tags[i];
  });

  document.querySelectorAll(".section-heading h2").forEach((el, i) => {
    const span = el.querySelector("span");
    if (span) {
      const words = t.sectionTitles[i].split(" ");
      span.textContent = words.pop();
      el.childNodes[0].textContent = words.join(" ") + " ";
    } else {
      el.textContent = t.sectionTitles[i];
    }
  });

  document.querySelectorAll(".stat-card span").forEach((el, i) => {
    el.textContent = t.statNames[i];
  });

  document.querySelector(".note").textContent = t.note;

  document.querySelectorAll(".career-item h3").forEach((el, i) => {
    el.textContent = t.clubs[i];
  });

  document.querySelector(".career-item.current small").textContent = t.currentClub;
  document.querySelector(".about-card > p").textContent = t.about;

  document.querySelectorAll(".about-details span").forEach((el, i) => {
    el.textContent = t.details[i];
  });

  document.querySelectorAll("thead th").forEach((el, i) => {
    if (t.table[i]) el.textContent = t.table[i];
  });

  const emptyCell = document.querySelector("#matchTable td");
  if (emptyCell) emptyCell.textContent = t.empty;

  document.querySelector(".add-match h3").textContent = t.addMatch;
  document.getElementById("opponent").placeholder = t.opponent;
  document.getElementById("result").placeholder = t.result;
  document.getElementById("matchGoals").placeholder = t.goals;
  document.getElementById("matchAssists").placeholder = t.assists;
  document.getElementById("matchMinutes").placeholder = t.minutes;

  document.querySelector(".starter-label").lastChild.textContent = " " + t.starter;
  document.querySelector("#matchForm button").textContent = t.addButton;

  document.querySelector("footer small").textContent =
    `© 2026 RAYAN FOOTBALL. ${t.footer}`;

  languageToggle.textContent = isEnglish ? "العربية" : "ENGLISH";
}

let currentLanguage = "ar";

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "ar" ? "en" : "ar";
  setLanguage(currentLanguage);
});// MANUAL PLAYER STATISTICS
const manualStats = [
  { input: "editMatches", display: "matches" },
  { input: "editGoals", display: "goals" },
  { input: "editAssists", display: "assists" },
  { input: "editMinutes", display: "minutes" },
  { input: "editStarts", display: "starts" },
  { input: "editYellowCards", display: "yellowCards" }
];

const saveStatsButton = document.getElementById("saveManualStats");

if (saveStatsButton) {
  const savedStats = JSON.parse(localStorage.getItem("rayanManualStats") || "null");

  if (savedStats) {
    manualStats.forEach(stat => {
      const input = document.getElementById(stat.input);
      if (input && savedStats[stat.display] !== undefined) {
        input.value = savedStats[stat.display];
      }
    });
  }

  manualStats.forEach(stat => {
    const input = document.getElementById(stat.input);
    const display = document.getElementById(stat.display);

    if (input && display) {
      display.textContent = input.value;
    }
  });

  saveStatsButton.addEventListener("click", () => {
    const values = {};

    for (const stat of manualStats) {
      const input = document.getElementById(stat.input);
      const number = Number(input.value);

      if (!input.value.trim() || !Number.isSafeInteger(number) || number < 0) {
        alert("من فضلك أدخل أرقامًا صحيحة غير سالبة في كل الخانات.");
        return;
      }

      values[stat.display] = number;
    }

    if (
      values.goals > values.matches ||
      values.assists > values.matches ||
      values.starts > values.matches
    ) {
      alert("راجع الأرقام: الأهداف والتمريرات الحاسمة والمباريات الأساسية لا يمكن أن تتجاوز عدد المباريات.");
      return;
    }

    localStorage.setItem("rayanManualStats", JSON.stringify(values));

    manualStats.forEach(stat => {
      document.getElementById(stat.display).textContent = values[stat.display];
    });

    document.getElementById("statsSaveMessage").textContent =
      "تم حفظ الإحصائيات بنجاح!";
  });
}