-- MIGRATION: Torna Categoria Obrigatória no Produto
-- Justificativa: Com o Soft Delete em vigor, a exclusão da Categoria nunca ocorre fisicamente.
-- Produtos órfãos não devem existir.

-- 1. Removemos a restrição de que setava NULL
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_id_fkey;

-- 2. Reforçamos o relacionamento para ON DELETE RESTRICT e NOT NULL
ALTER TABLE products 
  ALTER COLUMN category_id SET NOT NULL,
  ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT;
