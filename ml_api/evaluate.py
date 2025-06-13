import numpy as np
from sklearn.metrics import classification_report

def evaluate_model(model, val_generator):
    val_generator.reset()
    preds = model.predict(val_generator)
    y_pred = np.argmax(preds, axis=1)
    y_true = val_generator.classes
    labels = list(val_generator.class_indices.keys())

    report = classification_report(y_true, y_pred, target_names=labels, output_dict=True)
    print(classification_report(y_true, y_pred, target_names=labels))

    return report
