CREATE POLICY "Capas de novidades leitura publica"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'novidades-capas');

CREATE POLICY "Autenticados enviam capas de novidades"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'novidades-capas');

CREATE POLICY "Autenticados atualizam capas de novidades"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'novidades-capas');

CREATE POLICY "Autenticados excluem capas de novidades"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'novidades-capas');
