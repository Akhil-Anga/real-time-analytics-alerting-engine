import json
import random
import time
from datetime import datetime, timezone

from kafka import KafkaProducer


KAFKA_TOPIC = "machine-metrics"
KAFKA_SERVER = "localhost:9092"


def generate_machine_metric():
    machine_id = f"Rotor-{random.randint(1, 5):03d}"

    metric = {
        "machineId": machine_id,
        "rpm": random.randint(2800, 4600),
        "vibration": round(random.uniform(0.10, 1.20), 2),
        "temperature": round(random.uniform(55.0, 105.0), 2),
        "pressure": round(random.uniform(25.0, 70.0), 2),
        "powerConsumption": round(random.uniform(8.0, 22.0), 2),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    return metric


def create_producer():
    return KafkaProducer(
        bootstrap_servers=KAFKA_SERVER,
        value_serializer=lambda value: json.dumps(value).encode("utf-8")
    )


def main():
    producer = create_producer()

    print("Starting machine metrics producer...")
    print(f"Sending data to Kafka topic: {KAFKA_TOPIC}")

    while True:
        metric = generate_machine_metric()

        producer.send(KAFKA_TOPIC, value=metric)
        producer.flush()

        print(f"Sent: {metric}")

        time.sleep(1)


if __name__ == "__main__":
    main()