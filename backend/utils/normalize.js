function normalizeFeedback(feedback) {
  return feedback.map((item) => ({
    agree: item.agree ? 1 : 0,
    annotation: item.annotation ? item.annotation.toLowerCase().trim() : "",
    comment: item.comment ? item.comment.toLowerCase().trim() : "",
    boundingBoxes: item.boundingBoxes,
  }));
}

export default normalizeFeedback;
