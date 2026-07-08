import * as React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetOne } from "react-admin";
import { Project } from "../../types";

const exchangeRates: Record<string, number> = {
  USD: 1,
  INR: 0.012,
  NZD: 0.61,
  EUR: 1.07,
  AUD: 0.67,
  GBP: 1.27,
  SGD: 0.74,
  CAD: 0.75,
  HKD: 0.13,
};

function convertToUSD(amount: number | undefined, currency: string | undefined): number | null {
  if (amount == null || !currency) return null;
  const rate = exchangeRates[currency];
  return rate ? amount * rate : null;
}

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card variant="outlined" sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="body2">{value ?? "-"}</Typography>
  </Grid>
);

const ProjectShowPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isPending, error } = useGetOne<Project>("allProjects", {
    id: id as string,
  });

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box p={4}>
        <Typography color="error">Project not found.</Typography>
      </Box>
    );
  }

  const minUSD = convertToUSD(project.budget?.minimum, project.currency);
  const maxUSD = convertToUSD(project.budget?.maximum, project.currency);
  const avgBidUSD = convertToUSD(project.bidStats?.bid_avg, project.currency);

  return (
    <Box p={2} maxWidth={900} margin="0 auto">
      <Link
        component={RouterLink}
        to="/all-projects"
        underline="hover"
        sx={{ display: "inline-flex", alignItems: "center", mb: 2 }}
      >
        <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
        Back to All Projects
      </Link>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
            spacing={1}
          >
            <Box>
              <Typography variant="h5">{project.title}</Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                {project.status && (
                  <Chip label={project.status} size="small" />
                )}
                <Typography variant="body2" color="text.secondary">
                  Id: {project.id}
                  {project.remoteId ? ` · Remote Id: ${project.remoteId}` : ""}
                </Typography>
              </Stack>
            </Box>
            {project.seoUrl && (
              <Link
                href={`https://www.freelancer.com/projects/${project.seoUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "inline-flex", alignItems: "center" }}
              >
                View on Freelancer
                <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Section title="Description">
        <Typography variant="body2" whiteSpace="pre-wrap">
          {project.description || "-"}
        </Typography>
      </Section>

      <Section title="Budget & Type">
        <Grid container spacing={2}>
          <Field label="Type" value={project.type} />
          <Field label="Currency" value={project.currency} />
          <Field label="Bid period (days)" value={project.bidPeriod} />
          <Field
            label="Budget"
            value={
              project.budget
                ? `${project.budget.minimum ?? "-"} - ${project.budget.maximum ?? "-"} ${project.currency ?? ""}`
                : "-"
            }
          />
          <Field
            label="Budget (USD)"
            value={
              minUSD != null && maxUSD != null
                ? `${minUSD.toFixed(2)} - ${maxUSD.toFixed(2)}`
                : "-"
            }
          />
        </Grid>
      </Section>

      <Section title="Bid Stats">
        <Grid container spacing={2}>
          <Field label="Bid count" value={project.bidStats?.bid_count} />
          <Field
            label="Average bid"
            value={
              project.bidStats?.bid_avg != null
                ? `${project.bidStats.bid_avg} ${project.currency ?? ""}`
                : "-"
            }
          />
          <Field
            label="Average bid (USD)"
            value={avgBidUSD != null ? avgBidUSD.toFixed(2) : "-"}
          />
        </Grid>
      </Section>

      <Section title="Dates">
        <Grid container spacing={2}>
          <Field label="Submitted" value={formatDate(project.submitDate)} />
          <Field label="Ends" value={formatDate(project.endDate)} />
          <Field label="Updated" value={formatDate(project.timeUpdated)} />
        </Grid>
      </Section>

      <Section title="Owner & Location">
        <Grid container spacing={2}>
          <Field label="Owner country" value={project.ownerCountryName} />
          <Field label="Language" value={project.language} />
        </Grid>
      </Section>

      {project.jobs && project.jobs.length > 0 && (
        <Section title="Skills / Jobs">
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {project.jobs.map((job, index) => (
              <Chip key={job.id ?? index} label={job.name ?? String(job)} size="small" />
            ))}
          </Stack>
        </Section>
      )}
    </Box>
  );
};

export default ProjectShowPage;
