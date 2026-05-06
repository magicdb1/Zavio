document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  const savedUser = JSON.parse(localStorage.getItem("zavioUser"));
  const isLoggedIn = localStorage.getItem("zavioLoggedIn") === "true";

  if ((page === "landing" || page === "auth") && isLoggedIn && savedUser) {
    window.location.href = "dashboard.html";
    return;
  }

  if (page === "app" && (!isLoggedIn || !savedUser)) {
    window.location.href = "auth.html";
    return;
  }

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      forms.forEach((f) => f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab + "Form").classList.add("active");
    });
  });

  const registerForm = document.getElementById("registerForm");
  const registerStatus = document.getElementById("registerStatus");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const terms = document.getElementById("termsCheck");

      if (password.length < 6) {
        registerStatus.textContent =
          "Passwort muss mindestens 6 Zeichen haben.";
        return;
      }

      if (!terms.checked) {
        registerStatus.textContent =
          "Bitte akzeptiere die AGB und den Datenschutz.";
        return;
      }

      const user = { name, email, password };

      localStorage.setItem("zavioUser", JSON.stringify(user));
      localStorage.setItem("zavioLoggedIn", "true");

      window.location.href = "dashboard.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const user = JSON.parse(localStorage.getItem("zavioUser"));

      if (!user) {
        loginStatus.textContent = "Kein Account gefunden. Bitte registrieren.";
        return;
      }

      if (email === user.email && password === user.password) {
        localStorage.setItem("zavioLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        loginStatus.textContent = "E-Mail oder Passwort ist falsch.";
      }
    });
  }

  if (page === "app" && savedUser) {
    const nameEls = document.querySelectorAll("#dashboardName, #profileName");
    const emailEl = document.getElementById("profileEmail");

    nameEls.forEach((el) => (el.textContent = savedUser.name));
    if (emailEl) emailEl.textContent = savedUser.email;
  }

  const logoutButtons = document.querySelectorAll(
    "#logoutBtnTop, #logoutBtnBottom",
  );

  logoutButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("zavioLoggedIn");
      window.location.href = "index.html";
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const type = document.getElementById("type").value;
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`Zavio Kontakt: ${type}`);
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      );

      window.location.href = `mailto:dominik.birchler@icloud.com?subject=${subject}&body=${body}`;
      formStatus.textContent = "Mail wurde geöffnet.";
    });
  }

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("acceptCookies");
  const decline = document.getElementById("declineCookies");

  if (banner && accept && decline) {
    if (localStorage.getItem("cookiesChoice")) {
      banner.classList.add("hidden");
    }

    accept.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "accepted");
      banner.classList.add("hidden");
    });

    decline.addEventListener("click", () => {
      localStorage.setItem("cookiesChoice", "declined");
      banner.classList.add("hidden");
    });
  }

  const defaultExerciseLibrary = [
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Dumbbell Bench Press",
    "Incline Dumbbell Press",
    "Chest Press Machine",
    "Cable Fly",
    "Low Cable Fly",
    "High Cable Fly",
    "Pec Deck",
    "Push Ups",
    "Dips",
    "Shoulder Press",
    "Dumbbell Shoulder Press",
    "Machine Shoulder Press",
    "Arnold Press",
    "Lateral Raises",
    "Cable Lateral Raises",
    "Front Raises",
    "Rear Delt Fly",
    "Reverse Pec Deck",
    "Face Pulls",
    "Upright Row",
    "Shrugs",
    "Pull Ups",
    "Chin Ups",
    "Lat Pulldown",
    "Close Grip Pulldown",
    "Wide Grip Pulldown",
    "Straight Arm Pulldown",
    "Barbell Row",
    "Dumbbell Row",
    "Cable Row",
    "T-Bar Row",
    "Machine Row",
    "Chest Supported Row",
    "Deadlift",
    "Biceps Curl",
    "Hammer Curl",
    "Incline Dumbbell Curl",
    "Preacher Curl",
    "Cable Curl",
    "Concentration Curl",
    "EZ Bar Curl",
    "Triceps Pushdown",
    "Rope Pushdown",
    "Overhead Triceps Extension",
    "Skull Crushers",
    "Close Grip Bench Press",
    "Triceps Dips",
    "Squat",
    "Front Squat",
    "Hack Squat",
    "Leg Press",
    "Romanian Deadlift",
    "Stiff Leg Deadlift",
    "Leg Curl",
    "Seated Leg Curl",
    "Lying Leg Curl",
    "Leg Extension",
    "Walking Lunges",
    "Bulgarian Split Squat",
    "Hip Thrust",
    "Glute Bridge",
    "Calf Raises",
    "Seated Calf Raises",
    "Plank",
    "Cable Crunch",
    "Hanging Leg Raises",
    "Crunches",
    "Russian Twists",
    "Ab Machine",
  ];

  const workoutType = document.getElementById("workoutType");
  const exerciseSearch = document.getElementById("exerciseSearch");
  const exerciseSelect = document.getElementById("exerciseSelect");
  const setsInput = document.getElementById("setsInput");
  const setsContainer = document.getElementById("setsContainer");
  const addExerciseBtn = document.getElementById("addExerciseBtn");
  const addCustomExerciseBtn = document.getElementById("addCustomExerciseBtn");
  const saveWorkoutBtn = document.getElementById("saveWorkoutBtn");
  const templateSelect = document.getElementById("templateSelect");
  const loadTemplateBtn = document.getElementById("loadTemplateBtn");
  const saveTemplateBtn = document.getElementById("saveTemplateBtn");
  const workoutList = document.getElementById("workoutList");
  const currentWorkoutList = document.getElementById("currentWorkoutList");
  const workoutStatus = document.getElementById("workoutStatus");
  const historyTypeFilter = document.getElementById("historyTypeFilter");
  const historyDayFilter = document.getElementById("historyDayFilter");

  let currentExercises = [];

  function getWorkouts() {
    return JSON.parse(localStorage.getItem("zavioWorkouts")) || [];
  }

  function saveWorkouts(workouts) {
    localStorage.setItem("zavioWorkouts", JSON.stringify(workouts));
  }

  function getTemplates() {
    return JSON.parse(localStorage.getItem("zavioWorkoutTemplates")) || [];
  }

  function saveTemplates(templates) {
    localStorage.setItem("zavioWorkoutTemplates", JSON.stringify(templates));
  }

  function renderTemplates() {
    if (!templateSelect) return;

    const templates = getTemplates();

    templateSelect.innerHTML = `
      <option value="">Keine Vorlage</option>
      ${templates
        .map(
          (template, index) =>
            `<option value="${index}">${template.name}</option>`,
        )
        .join("")}
    `;
  }

  function getCustomExercises() {
    return JSON.parse(localStorage.getItem("zavioCustomExercises")) || [];
  }

  function getExerciseLibrary() {
    return [...defaultExerciseLibrary, ...getCustomExercises()].sort();
  }

  function saveCustomExercise(exerciseName) {
    const customExercises = getCustomExercises();

    const alreadyExists = getExerciseLibrary().some(
      (exercise) => exercise.toLowerCase() === exerciseName.toLowerCase(),
    );

    if (alreadyExists) return false;

    customExercises.push(exerciseName);
    localStorage.setItem(
      "zavioCustomExercises",
      JSON.stringify(customExercises),
    );

    return true;
  }

  function renderExerciseOptions() {
    if (!exerciseSelect) return;

    const search = exerciseSearch
      ? exerciseSearch.value.toLowerCase().trim()
      : "";

    const filteredExercises = getExerciseLibrary().filter((exercise) =>
      exercise.toLowerCase().includes(search),
    );

    if (filteredExercises.length === 0) {
      exerciseSelect.innerHTML = `<option value="">Keine Übung gefunden</option>`;

      if (addCustomExerciseBtn && search.length > 0) {
        addCustomExerciseBtn.classList.add("show-custom-btn");
      }

      return;
    }

    if (addCustomExerciseBtn) {
      addCustomExerciseBtn.classList.remove("show-custom-btn");
    }

    exerciseSelect.innerHTML = filteredExercises
      .map((exercise) => `<option value="${exercise}">${exercise}</option>`)
      .join("");
  }

  function renderSetInputs() {
    if (!setsContainer || !setsInput) return;

    const amount = Number(setsInput.value);

    if (!amount || amount <= 0) {
      setsContainer.innerHTML = "";
      return;
    }

    setsContainer.innerHTML = Array.from({ length: amount })
      .map(
        (_, index) => `
          <div class="set-row">
            <strong>Satz ${index + 1}</strong>

            <div class="form-group">
              <label>Wdh.</label>
              <input class="set-reps-input" type="number" min="1" placeholder="8" />
            </div>

            <div class="form-group">
              <label>kg</label>
              <input class="set-weight-input" type="number" min="0" step="0.5" placeholder="80" />
            </div>
          </div>
        `,
      )
      .join("");

    syncWeightInputs();
  }

  function syncWeightInputs() {
    const weightInputs = document.querySelectorAll(".set-weight-input");

    if (weightInputs.length === 0) return;

    const firstInput = weightInputs[0];

    firstInput.addEventListener("input", () => {
      const value = firstInput.value;

      weightInputs.forEach((input, index) => {
        if (index > 0) {
          input.value = value;
        }
      });
    });
  }

  function getSetData() {
    const repsInputs = document.querySelectorAll(".set-reps-input");
    const weightInputs = document.querySelectorAll(".set-weight-input");

    const sets = [];

    repsInputs.forEach((repsInput, index) => {
      const reps = Number(repsInput.value);
      const weight = Number(weightInputs[index].value);

      sets.push({ reps, weight });
    });

    return sets;
  }

  function getExerciseVolume(exercise) {
    return exercise.sets.reduce((total, set) => {
      return total + set.reps * set.weight;
    }, 0);
  }

  function getExerciseBestWeight(exercise) {
    return Math.max(...exercise.sets.map((set) => set.weight));
  }

  function renderCurrentWorkout() {
    if (!currentWorkoutList) return;

    if (currentExercises.length === 0) {
      currentWorkoutList.innerHTML = "<p>Noch keine Übung hinzugefügt.</p>";
      return;
    }

    currentWorkoutList.innerHTML = currentExercises
      .map(
        (exercise, index) => `
          <div class="workout-entry">
            <div>
              <strong>${exercise.name}</strong>
              <p>
                ${exercise.sets
                  .map(
                    (set, setIndex) =>
                      `Satz ${setIndex + 1}: ${set.reps} Wdh. × ${set.weight} kg`,
                  )
                  .join(" · ")}
              </p>
            </div>

            <div class="workout-entry-actions">
              <button class="edit-current-exercise" data-index="${index}" type="button">
                Bearbeiten
              </button>

              <button class="delete-current-exercise" data-index="${index}" type="button">
                Entfernen
              </button>
            </div>
          </div>
        `,
      )
      .join("");

    document.querySelectorAll(".delete-current-exercise").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        currentExercises.splice(index, 1);
        renderCurrentWorkout();
      });
    });

    document.querySelectorAll(".edit-current-exercise").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        const exercise = currentExercises[index];

        document.getElementById("exerciseSearch").value = exercise.name;
        renderExerciseOptions();
        document.getElementById("exerciseSelect").value = exercise.name;

        document.getElementById("setsInput").value = exercise.sets.length;
        renderSetInputs();

        const repsInputs = document.querySelectorAll(".set-reps-input");
        const weightInputs = document.querySelectorAll(".set-weight-input");

        exercise.sets.forEach((set, setIndex) => {
          if (repsInputs[setIndex]) repsInputs[setIndex].value = set.reps;
          if (weightInputs[setIndex]) weightInputs[setIndex].value = set.weight;
        });

        currentExercises.splice(index, 1);
        renderCurrentWorkout();

        workoutStatus.textContent = `"${exercise.name}" wird bearbeitet. Passe die Werte an und klicke wieder auf "Übung hinzufügen".`;
      });
    });
  }

  function renderWorkouts() {
    if (!workoutList) return;

    const workouts = getWorkouts();

    const selectedType = historyTypeFilter ? historyTypeFilter.value : "";
    const selectedDay = historyDayFilter ? historyDayFilter.value : "";

    const filteredWorkouts = workouts
      .filter((workout) => {
        const matchesType = !selectedType || workout.type === selectedType;
        const matchesDay = !selectedDay || workout.day === selectedDay;

        return matchesType && matchesDay;
      })
      .slice(0, 10);

    const analysisCount = document.getElementById("analysisCount");
    const analysisExercises = document.getElementById("analysisExercises");
    const analysisVolume = document.getElementById("analysisVolume");
    const analysisBest = document.getElementById("analysisBest");

    if (workouts.length === 0) {
      workoutList.innerHTML = "<p>Noch keine Workouts gespeichert.</p>";

      if (analysisCount) analysisCount.textContent = "0";
      if (analysisExercises) analysisExercises.textContent = "0";
      if (analysisVolume) analysisVolume.textContent = "0 kg";
      if (analysisBest) analysisBest.textContent = "-";

      return;
    }

    let totalVolume = 0;
    let totalExercises = 0;
    let bestExercise = null;
    let bestWeight = 0;

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        totalVolume += getExerciseVolume(exercise);
        totalExercises++;

        const exerciseBestWeight = getExerciseBestWeight(exercise);

        if (exerciseBestWeight > bestWeight) {
          bestWeight = exerciseBestWeight;
          bestExercise = exercise;
        }
      });
    });

    if (analysisCount) analysisCount.textContent = workouts.length;
    if (analysisExercises) analysisExercises.textContent = totalExercises;
    if (analysisVolume) analysisVolume.textContent = `${totalVolume} kg`;

    if (analysisBest) {
      analysisBest.textContent = bestExercise
        ? `${bestExercise.name} (${bestWeight} kg)`
        : "-";
    }

    if (filteredWorkouts.length === 0) {
      workoutList.innerHTML = "<p>Keine passenden Workouts gefunden.</p>";
      return;
    }

    workoutList.innerHTML = filteredWorkouts
      .map(
        (workout, index) => `
          <details class="saved-workout">
            <summary class="saved-workout-summary">
              <div>
                <strong>${workout.day} · ${workout.type}</strong>
                <p>${new Date(workout.date).toLocaleDateString("de-CH")} · ${
                  workout.exercises.length
                } Übungen</p>
              </div>

              <button class="delete-workout" data-id="${workout.id}" type="button">
                Workout löschen
              </button>
            </summary>

            <div class="saved-workout-exercises">
              ${workout.exercises
                .map(
                  (exercise) => `
                    <div class="workout-entry">
                      <div>
                        <strong>${exercise.name}</strong>
                        <p>
                          ${exercise.sets
                            .map(
                              (set, setIndex) =>
                                `Satz ${setIndex + 1}: ${set.reps} Wdh. × ${set.weight} kg`,
                            )
                            .join(" · ")}
                        </p>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </details>
        `,
      )
      .join("");

    document.querySelectorAll(".delete-workout").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const workoutId = button.dataset.id;
        const updatedWorkouts = getWorkouts().filter(
          (workout) => workout.id !== workoutId,
        );

        saveWorkouts(updatedWorkouts);
        renderWorkouts();
      });
    });
  }

  if (exerciseSelect) renderExerciseOptions();
  if (templateSelect) renderTemplates();

  if (setsInput) {
    setsInput.addEventListener("input", renderSetInputs);
  }

  if (exerciseSearch) {
    exerciseSearch.addEventListener("input", renderExerciseOptions);
  }

  if (workoutType) {
    workoutType.addEventListener("change", () => {
      currentExercises = [];
      renderCurrentWorkout();
      renderExerciseOptions();
    });
  }

  if (historyTypeFilter) {
    historyTypeFilter.addEventListener("change", renderWorkouts);
  }

  if (historyDayFilter) {
    historyDayFilter.addEventListener("change", renderWorkouts);
  }

  if (addCustomExerciseBtn) {
    addCustomExerciseBtn.addEventListener("click", () => {
      const customExercise = exerciseSearch.value.trim();

      if (!customExercise) {
        workoutStatus.textContent =
          "Schreibe zuerst den Namen der neuen Übung ins Suchfeld.";
        return;
      }

      const wasAdded = saveCustomExercise(customExercise);

      if (!wasAdded) {
        workoutStatus.textContent = "Diese Übung existiert bereits.";
        return;
      }

      renderExerciseOptions();
      exerciseSelect.value = customExercise;
      addCustomExerciseBtn.classList.remove("show-custom-btn");

      workoutStatus.textContent = `"${customExercise}" wurde hinzugefügt.`;
    });
  }

  if (addExerciseBtn) {
    addExerciseBtn.addEventListener("click", () => {
      const sets = getSetData();

      const exercise = {
        name: document.getElementById("exerciseSelect").value,
        sets,
      };

      const hasInvalidSet = sets.some(
        (set) =>
          set.reps <= 0 ||
          set.weight < 0 ||
          Number.isNaN(set.reps) ||
          Number.isNaN(set.weight),
      );

      if (!exercise.name || sets.length === 0 || hasInvalidSet) {
        workoutStatus.textContent =
          "Bitte Übung wählen und alle Sätze korrekt ausfüllen.";
        return;
      }

      currentExercises.push(exercise);

      document.getElementById("setsInput").value = "";
      setsContainer.innerHTML = "";

      workoutStatus.textContent = "Übung hinzugefügt.";
      renderCurrentWorkout();
    });
  }

  if (saveTemplateBtn) {
    saveTemplateBtn.addEventListener("click", () => {
      const type = document.getElementById("workoutType").value;

      if (!type || currentExercises.length === 0) {
        workoutStatus.textContent =
          "Wähle ein Training und füge zuerst Übungen hinzu.";
        return;
      }

      const templateName = prompt("Name der Vorlage:", `${type} Vorlage`);

      if (!templateName) return;

      const templates = getTemplates();

      templates.unshift({
        id: crypto.randomUUID(),
        name: templateName,
        type,
        exercises: JSON.parse(JSON.stringify(currentExercises)),
        createdAt: new Date().toISOString(),
      });

      saveTemplates(templates);
      renderTemplates();

      workoutStatus.textContent = `"${templateName}" wurde gespeichert.`;
    });
  }

  if (loadTemplateBtn) {
    loadTemplateBtn.addEventListener("click", () => {
      const templateIndex = templateSelect.value;

      if (templateIndex === "") {
        workoutStatus.textContent = "Bitte zuerst eine Vorlage auswählen.";
        return;
      }

      const templates = getTemplates();
      const template = templates[Number(templateIndex)];

      if (!template) return;

      document.getElementById("workoutType").value = template.type;

      currentExercises = JSON.parse(JSON.stringify(template.exercises));

      renderCurrentWorkout();
      renderExerciseOptions();

      workoutStatus.textContent = `"${template.name}" wurde geladen. Du kannst jede Übung mit "Bearbeiten" anpassen.`;
    });
  }

  if (saveWorkoutBtn) {
    saveWorkoutBtn.addEventListener("click", () => {
      const workout = {
        id: crypto.randomUUID(),
        day: document.getElementById("workoutDay").value,
        type: document.getElementById("workoutType").value,
        date: new Date().toISOString(),
        exercises: currentExercises,
      };

      if (!workout.type || workout.exercises.length === 0) {
        workoutStatus.textContent =
          "Bitte Training wählen und mindestens eine Übung hinzufügen.";
        return;
      }

      const workouts = getWorkouts();
      workouts.unshift(workout);
      saveWorkouts(workouts);

      currentExercises = [];

      document.getElementById("exerciseSearch").value = "";
      document.getElementById("setsInput").value = "";
      setsContainer.innerHTML = "";

      renderExerciseOptions();
      renderCurrentWorkout();
      renderWorkouts();

      workoutStatus.textContent = "Workout gespeichert.";
    });

    renderCurrentWorkout();
    renderWorkouts();
  }
});
