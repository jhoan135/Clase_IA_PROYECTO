import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


def build_dataset(n_samples=200, seed=42):
    np.random.seed(seed)

    km = np.random.randint(10000, 150000, n_samples)
    meses = np.random.randint(0, 24, n_samples)
    ruido = np.random.randint(1, 4, n_samples)
    encendido = np.random.randint(1, 4, n_samples)

    x = np.column_stack([km, meses, ruido, encendido])
    y = []

    for km_val, meses_val, ruido_val, encendido_val in x:
        if ruido_val == 3 or encendido_val == 3 or meses_val > 8:
            y.append(2)
        elif (km_val > 30000 and meses_val > 4) or ruido_val == 2 or encendido_val == 2:
            y.append(1)
        else:
            y.append(0)

    return x, np.array(y)


def main():
    x, y = build_dataset()
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.3, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)

    model = LogisticRegression(max_iter=1000)
    model.fit(x_train_scaled, y_train)
    predictions = model.predict(x_test_scaled)

    print("Entradas totales:", len(y))
    print("Entrenamiento:", len(y_train))
    print("Prueba:", len(y_test))
    print("Exactitud:", round(accuracy_score(y_test, predictions), 4))
    print("\nReporte por clase:")
    print(
        classification_report(
            y_test,
            predictions,
            target_names=["Bajo", "Medio", "Alto"],
            zero_division=0,
        )
    )
    print("Matriz de confusion:")
    print(confusion_matrix(y_test, predictions))


if __name__ == "__main__":
    main()
