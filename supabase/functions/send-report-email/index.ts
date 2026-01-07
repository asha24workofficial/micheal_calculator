import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  buildingType: string;
  projectType: string;
  projectSize: number;
  savingsAmount: number;
  currentSystemCost: number;
  currentSystemCostPerSF: number;
  maxterraCost: number;
  maxterraCostPerSF: number;
  competitorName?: string;
}

function generateCSV(data: FormData): string {
  const dateSubmitted = new Date().toISOString().split('T')[0];
  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Building Type",
    "Project Type",
    "Project Size (sq ft)",
    "Current System Cost",
    "Current Cost per SF",
    "MAXTERRA System Cost",
    "MAXTERRA Cost per SF",
    "Total Savings",
    "Competitor Name",
    "Date Submitted",
  ];

  const values = [
    data.firstName,
    data.lastName,
    data.email,
    data.buildingType,
    data.projectType,
    data.projectSize,
    data.currentSystemCost,
    data.currentSystemCostPerSF.toFixed(2),
    data.maxterraCost,
    data.maxterraCostPerSF.toFixed(2),
    data.savingsAmount,
    data.competitorName || "N/A",
    dateSubmitted,
  ];

  return headers.join(",") + "\n" + values.map(v => `"${v}"`).join(",");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: FormData = await req.json();

    if (!data.email || !data.firstName || !data.lastName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const csv = generateCSV(data);

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("form_submissions").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      building_type: data.buildingType,
      project_type: data.projectType,
      project_size: data.projectSize,
      savings_amount: data.savingsAmount,
      current_system_cost: data.currentSystemCost,
      current_system_cost_per_sf: data.currentSystemCostPerSF,
      maxterra_cost: data.maxterraCost,
      maxterra_cost_per_sf: data.maxterraCostPerSF,
      competitor_name: data.competitorName || null,
    });

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const response = {
      success: true,
      message: "Form submitted successfully",
      csv: csv,
      fileName: `maxterra-savings-report-${data.firstName}-${data.lastName}.csv`,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});