import { createClient } from '@supabase/supabase-js';

const URL = 'https://aeuddjnfmjouhafhcgqt.supabase.co';
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFldWRkam5mbWpvdWhhZmhjZ3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NTg5MDIsImV4cCI6MjAzOTIzNDkwMn0.rYIJ4NjmbukqxFx-9JXPWssDeEK677f9Rk0GvrYy5ZQ';

const supabase = createClient(URL, API_KEY);

export default supabase;
