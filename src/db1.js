import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvpzqpmohxndkoxzdhbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cHpxcG1vaHhuZGtveHpkaGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3MDM4ODMsImV4cCI6MjAxNzI3OTg4M30.JTVRX52Wl8JYOKW0ny6Gvil1gwSMsDpfK6S5V9koPo8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
