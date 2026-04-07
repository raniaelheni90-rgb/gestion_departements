# Migration to add missing statutAdministratif column using raw SQL

from django.db import migrations


def add_column_if_missing(apps, schema_editor):
    """Add statutAdministratif column if it doesn't exist"""
    # Using raw SQL to add the column if it doesn't exist
    schema_editor.execute("""
        ALTER TABLE enseignants_enseignant 
        ADD COLUMN IF NOT EXISTS "statutAdministratif" VARCHAR(100) NULL;
    """)


def remove_column(apps, schema_editor):
    """Remove the column on rollback"""
    try:
        schema_editor.execute("""
            ALTER TABLE enseignants_enseignant 
            DROP COLUMN "statutAdministratif";
        """)
    except:
        pass


class Migration(migrations.Migration):

    dependencies = [
        ('enseignants', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE enseignants_enseignant ADD COLUMN IF NOT EXISTS \"statutAdministratif\" VARCHAR(100) NULL;",
            reverse_sql="ALTER TABLE enseignants_enseignant DROP COLUMN IF EXISTS \"statutAdministratif\";"
        ),
    ]
