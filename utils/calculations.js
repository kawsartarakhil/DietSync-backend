const calculateBMI = (weight, height) => {
  const h = height / 100;
  const bmi = +(weight / (h * h)).toFixed(1);

  let category = "Normal weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
};

const calculateWater = (weight) => {
  return {
    waterMl: weight * 35,
    waterLiters: +(weight * 0.035).toFixed(1),
  };
};

const calculateCalories = (weight, height, age, gender, goal) => {
  let bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = Math.round(bmr * 1.55);

  let calorieTarget = tdee;

  if (goal === "lose") calorieTarget -= 500;
  if (goal === "gain") calorieTarget += 400;

  if (calorieTarget < 1200) calorieTarget = 1200;

  return {
    bmr: Math.round(bmr),
    tdee,
    calorieTarget,
  };
};

const getFoodsToAvoid = (goal) => {
  const data = {
    lose: ["fried food", "sugar", "fast food"],
    maintain: ["excess junk food"],
    gain: ["low calorie foods"],
  };

  return data[goal] || [];
};

module.exports = {
  calculateBMI,
  calculateWater,
  calculateCalories,
  getFoodsToAvoid,
};