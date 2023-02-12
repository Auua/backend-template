### uml: entity relation

````mermaid
erDiagram

    USER {
        string id PK
        string email "UNIQUE"
        string name
        string password
        string refresh_token
        date created_at
        date updated_at
    }
    ITEM {
        string id PK
        string name
        string description
        string count
        date created_at
        date updated_at
    }
    USER ||--o{ ITEM: owns
````