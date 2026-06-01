# Real-Time Analytics & Alerting Engine - Architecture

## Goal

Build a real-time machine monitoring platform that collects live machine metrics, processes them through Kafka, stores historical data, caches latest metrics, and displays alerts on a dashboard.

## MVP Architecture

Data Simulator → Kafka → Node.js Consumer/API → Redis + PostgreSQL → Angular Dashboard

## Services

### Data Simulator
Generates fake machine metrics such as temperature, vibration, pressure, and RPM.

### Kafka
Acts as the streaming layer for machine metrics.

### Node.js Backend
Consumes Kafka messages, stores data in PostgreSQL, caches latest metrics in Redis, and exposes REST APIs.

### Redis
Stores latest machine metrics for fast dashboard access.

### PostgreSQL
Stores historical machine metrics.

### Angular Dashboard
Displays live machine metrics and alerts.

## Future Enhancements

- Spring Boot Processing Service
- AWS Lambda Event Processing
- ML Anomaly Detection Service
- WebSocket Real-Time Updates
- Cassandra for High-Volume Storage
- Kubernetes Deployment