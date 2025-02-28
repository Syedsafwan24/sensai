import { faqs } from '@/data/faqs';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';

function Questions() {
	return (
		<section className='w-full py-12 md:py-24 lg:py-28 bg-background'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='text-center mb-12 max-w-3xl mx-auto'>
					<h2 className='text-3xl font-bold mb-4'>
						Frequently Asked Questions
					</h2>
					<p className='text-muted-foreground'>
						Find answers to common questions about our platform
					</p>
				</div>
				<div className='max-w-6xl mx-auto'>
					<Accordion type='single' collapsible className='w-full'>
						{faqs.map((faq, index) => {
							return (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger>{faq.question}</AccordionTrigger>
									<AccordionContent>{faq.answer}</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

export default Questions;
