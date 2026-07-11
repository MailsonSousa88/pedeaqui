ALTER TABLE stores
  ADD COLUMN city text,
  ADD COLUMN state varchar(2);

UPDATE stores
SET
  city = COALESCE(NULLIF(city, ''), 'Nao informado'),
  state = COALESCE(NULLIF(state, ''), 'SP');

ALTER TABLE stores
  ALTER COLUMN city SET NOT NULL,
  ALTER COLUMN state SET NOT NULL,
  ADD CONSTRAINT stores_city_not_blank CHECK (length(btrim(city)) > 0),
  ADD CONSTRAINT stores_state_uf_format CHECK (state ~ '^[A-Z]{2}$');
