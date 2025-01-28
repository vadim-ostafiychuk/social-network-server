import { Migration } from "@mikro-orm/migrations";

export class Migration20250128062619 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "middle_name" varchar(255) not null, "email" varchar(255) not null);`
    );
  }
}
