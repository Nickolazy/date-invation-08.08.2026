import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useInvitation } from "./hooks/useInvitation";
import { MusicToggle } from "./components/ui/MusicToggle";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { InvitationScreen } from "./screens/InvitationScreen";
import { DateScreen } from "./screens/DateScreen";
import { MovieScreen } from "./screens/MovieScreen";
import { FoodScreen } from "./screens/FoodScreen";
import { MeetingPointScreen } from "./screens/MeetingPointScreen";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";

function App() {
  const invitation = useInvitation();
  const { step } = invitation;

  const renderScreen = () => {
    switch (step) {
      case "welcome":
        return <WelcomeScreen onDone={invitation.next} />;

      case "invitation":
        return (
          <InvitationScreen
            onDone={invitation.next}
            onNoClick={invitation.incrementNoClicks}
          />
        );

      case "date":
        return (
          <DateScreen
            selectedId={invitation.selections.dateId}
            onSelect={invitation.selectDate}
            onNext={invitation.advance}
          />
        );

      case "movie":
        return (
          <MovieScreen
            date={invitation.selectedDate}
            selectedId={invitation.selections.movieId}
            onSelect={invitation.selectMovie}
            allSelected={invitation.allSelected}
            onDone={invitation.advance}
          />
        );

      case "food":
        return (
          <FoodScreen
            selectedId={invitation.selections.foodId}
            onSelect={invitation.selectFood}
            onNext={invitation.advance}
          />
        );

      case "meetingPoint":
        return (
          <MeetingPointScreen
            selectedId={invitation.selections.meetingPointId}
            onSelect={invitation.selectMeetingPoint}
            onDone={invitation.advance}
          />
        );

      case "confirmation":
        return (
          <ConfirmationScreen
            date={invitation.selectedDate}
            movie={invitation.selectedMovie}
            food={invitation.selectedFood}
            meetingPoint={invitation.selectedMeetingPoint}
            onEdit={invitation.goTo}
            onReset={invitation.reset}
            submissionStatus={invitation.submissionStatus}
            onSubmit={invitation.submit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex h-dvh flex-col overflow-hidden bg-ivory pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
        <div className="grain" />
        <MusicToggle />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
