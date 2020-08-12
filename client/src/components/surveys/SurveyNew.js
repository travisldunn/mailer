import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
import { reduxForm } from "redux-form";

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  return (
    <div>
      {showReview ? (
        <SurveyReview onBack={() => setShowReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowReview(true)} />
      )}
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
